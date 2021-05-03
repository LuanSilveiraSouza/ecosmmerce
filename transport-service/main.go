package main

import (
	"fmt"
	"net"

	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/pb"
	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/transport"
	"google.golang.org/grpc"
)

func main() {
	server, err := net.Listen("tcp", "localhost:3131")

	if err != nil {
		panic(err)
	}
	fmt.Println("GRPC server running")

	grpcServer := grpc.NewServer()
	pb.RegisterTransportServiceServer(grpcServer, &transport.TransportService{})

	if err := grpcServer.Serve(server); err != nil {
		panic(err)
	}
}
