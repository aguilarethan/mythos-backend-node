import * as grpc from '@grpc/grpc-js'; 
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { commentHandlers } from '../comment.grpc';

const PROTO_PATH = path.join(__dirname, '../proto/comment.proto'); 

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(proto.comment.CommentService.service, commentHandlers);

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('❌ Error iniciando gRPC:', err);
      return;
    }

    console.log(`🚀 gRPC server corriendo en puerto ${port}`);
  });
}
