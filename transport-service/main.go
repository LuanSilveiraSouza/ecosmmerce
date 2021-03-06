package main

import (
	"fmt"
	"net"

	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/pb"
	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/transport"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	server, err := net.Listen("tcp", fmt.Sprintf(":%d", 3131))

	transport.Init()

	if err != nil {
		panic(err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterTransportServiceServer(grpcServer, &transport.TransportService{})
	reflection.Register(grpcServer)

	fmt.Sprintln("Transport Service is up and running...")

	err = grpcServer.Serve(server)

	if err != nil {
		panic(err)
	}
}
