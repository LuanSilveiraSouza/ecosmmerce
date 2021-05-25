package transport

import (
	"context"
	"fmt"
	"time"

	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/pb"

	"github.com/go-redis/redis/v8"
)

type Request struct {
	Origin  string
	Destiny string
}

type Response struct {
	Origin  string
	Destiny string
	Cost    string
	Cache   bool
}

var (
	cacheExp    time.Duration
	redisClient *redis.Client
	ctx         context.Context
)

func Init() {
	cacheExp = time.Second * 10

	ctx = context.Background()

	redisClient = redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
}

func CalcTransport(req *pb.TransportRequest) (*pb.TransportResponse, error) {
	response := &pb.TransportResponse{
		Origin:  req.Origin,
		Destiny: req.Destiny,
		Cache:   true,
		Cost:    "",
	}

	key := req.Origin + "-" + req.Destiny

	val, err := redisClient.Get(ctx, key).Result()

	if err != nil {
		cost := fmt.Sprint((len(req.Origin) + len(req.Destiny)) * 100)

		redisClient.Set(ctx, key, cost, 0)

		response.Cache = false
		response.Cost = cost
	} else {
		response.Cost = val
	}

	return response, nil
}
