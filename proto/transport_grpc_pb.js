// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var transport_pb = require('./transport_pb.js');

function serialize_transport_TransportRequest(arg) {
  if (!(arg instanceof transport_pb.TransportRequest)) {
    throw new Error('Expected argument of type transport.TransportRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transport_TransportRequest(buffer_arg) {
  return transport_pb.TransportRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transport_TransportResponse(arg) {
  if (!(arg instanceof transport_pb.TransportResponse)) {
    throw new Error('Expected argument of type transport.TransportResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transport_TransportResponse(buffer_arg) {
  return transport_pb.TransportResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransportServiceService = exports.TransportServiceService = {
  calcTransport: {
    path: '/transport.TransportService/CalcTransport',
    requestStream: false,
    responseStream: false,
    requestType: transport_pb.TransportRequest,
    responseType: transport_pb.TransportResponse,
    requestSerialize: serialize_transport_TransportRequest,
    requestDeserialize: deserialize_transport_TransportRequest,
    responseSerialize: serialize_transport_TransportResponse,
    responseDeserialize: deserialize_transport_TransportResponse,
  },
};

exports.TransportServiceClient = grpc.makeGenericClientConstructor(TransportServiceService);
