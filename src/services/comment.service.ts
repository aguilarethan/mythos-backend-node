import { CommentModel } from "../models/comment.model";
import { IComment, IReply } from "../interfaces/comment.interface";
import { CustomError } from "../utils/CustomError";

export const getCommentsByChapterId = async (chapterId: string) => {
    return CommentModel.find({ chapterId });
}

export const saveComment = async (commentData: IComment) => {
    const newComment = new CommentModel(commentData);
    return newComment.save();
}

export const saveReply = async (commentId: string, replyData: IReply) => {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
        throw new CustomError(`El comentario no se encontró`, 404);
    }
    
    comment.replies.push(replyData);
    return comment.save();
}
