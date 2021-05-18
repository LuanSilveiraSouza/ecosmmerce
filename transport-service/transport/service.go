package transport

import (
	"context"

	"github.com/LuanSilveiraSouza/ecosmmerce/transport-service/pb"
)

type TransportService struct {
	pb.UnsafeTransportServiceServer
}

func (s *TransportService) CalcTransport(ctx context.Context, req *pb.TransportRequest) (*pb.TransportResponse, error) {
	response := pb.TransportResponse{Origin: req.Origin, Destiny: req.Destiny, Cost: "100", Cache: true}

	return &response, nil
}
