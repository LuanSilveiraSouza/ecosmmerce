package transport

import (
	"context"
	"fmt"
	"time"

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
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
}

func CalcTransport(request *Request) (Response, error) {
	response := &Response{
		Origin:  request.Origin,
		Destiny: request.Destiny,
		Cache:   true,
		Cost:    "",
	}

	key := request.Origin + "-" + request.Destiny

	val, err := redisClient.Get(ctx, key).Result()

	if err != nil {
		cost := (len(request.Origin) + len(request.Destiny)) * 1000

		err = redisClient.Set(ctx, key, cost, cacheExp).Err()

		if err == nil {
			response.Cache = false
			response.Cost = fmt.Sprint(cost)
		}
	} else {
		response.Cost = val
	}

	return *response, nil
}
