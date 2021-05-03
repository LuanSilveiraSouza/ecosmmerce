package main

import (
	"fmt"

	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/transport"
)

func main() {
	transport.Init()

	result, err := transport.CalcTransport(
		&transport.Request{Origin: "Earth", Destiny: "Mercury"},
	)

	if err != nil {
		panic(err)
	}

	fmt.Println(result)
}
