import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { config } from '../../config/config';

const PROTO_PATH = path.join(__dirname, '../proto/comment.proto'); 

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const grpcClient = new proto.comment.CommentService(
  config.grpcPort,
  grpc.credentials.createInsecure()
);

export default grpcClient;
