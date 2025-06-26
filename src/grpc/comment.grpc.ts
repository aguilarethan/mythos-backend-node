import { saveComment } from "../services/comment.service";
import grpc from '@grpc/grpc-js';

export const commentHandlers = {
    SaveComment: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
        const { chapterId, accountId, message } = call.request;

        try {
            const comment = await saveComment({
                chapterId,
                accountId,
                message,
                replies: [],
                likes: 0,
            });

            callback(null, {
                id: comment._id.toString(),
                chapterId: comment.chapterId.toString(),
                accountId: comment.accountId,
                message: comment.message,
                likes: comment.likes,
            });


        } catch (error) {
            console.error('Error saving comment:', error);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to save comment',
            });
        }


    }
}