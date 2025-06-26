import { CommentModel } from "../models/comment.model";
import { IComment, IReply } from "../interfaces/comment.interface";

export const saveComment = async (commentData: IComment) => {
    const newComment = new CommentModel(commentData);
    return newComment.save();
}