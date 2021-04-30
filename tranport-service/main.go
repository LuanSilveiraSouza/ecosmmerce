package main

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)

func main() {
	ctx := context.Background()

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	val, err := client.Get(ctx, "test").Result()

	if err != nil {
		err = client.Set(ctx, "test", "testing redis", 0).Err()
		if err != nil {
			panic(err)
		}
	} else {
		fmt.Println(val)
	}

	val, err = client.Get(ctx, "test").Result()

	fmt.Println(val)
}
