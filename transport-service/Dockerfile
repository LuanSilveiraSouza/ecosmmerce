FROM golang

WORKDIR /go/src

COPY . .

RUN go mod download

RUN go build

EXPOSE $GRPC_PORT