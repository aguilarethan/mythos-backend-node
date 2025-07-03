import { saveComment, saveReply, getCommentsByChapterId } from "../services/comment.service";
import * as grpc from "@grpc/grpc-js";

export const commentHandlers = {
    SaveComment: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
        const { chapterId, accountId, message, username } = call.request;

        try {
            const comment = await saveComment({
                chapterId,
                accountId,
                username,
                message,
                replies: [],
                likes: 0,
            });

            callback(null, {
                id: comment._id.toString(),
                chapterId: comment.chapterId.toString(),
                accountId: comment.accountId,
                username: comment.username,
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


    },

    GetCommentsByChapterId: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
        const { chapterId } = call.request;

        try {
            const comments = await getCommentsByChapterId(chapterId);

            const responseArray = comments.map(comment => ({
                id: comment._id.toString(),
                chapterId: comment.chapterId.toString(),
                accountId: comment.accountId,
                username: comment.username,
                message: comment.message,
                replies: comment.replies.map(reply => ({
                    id: reply._id?.toString() ?? '',
                    accountId: reply.accountId,
                    username: reply.username,
                    message: reply.message,
                    likes: reply.likes,
                })),
                likes: comment.likes,
            }));

            const response = {
                comments: responseArray,
            };

            callback(null, response);
        } catch (error) {
            console.error('Error fetching comments:', error);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to fetch comments',
            });
        }
    },

    SaveReply: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
        const { commentId, accountId, message, username } = call.request;

        try {
            const comment = await saveReply(commentId, {
                accountId,
                username,
                message,
                likes: 0,
            });

            if (!comment) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'Comment not found',
                });
                return;
            }

            const commentResponse = {
                id: comment._id.toString(),
                chapterId: comment.chapterId.toString(),
                accountId: comment.accountId,
                username: comment.username,
                message: comment.message,
                replies: comment.replies.map(reply => ({
                    id: reply._id?.toString() ?? '',
                    accountId: reply.accountId,
                    username: reply.username,
                    message: reply.message,
                    likes: reply.likes,
                })),
                likes: comment.likes,
            }

            callback(null, commentResponse); 
            
        } catch (error) {
            console.error('Error saving reply:', error);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to save reply',
            });
        }
    }
}