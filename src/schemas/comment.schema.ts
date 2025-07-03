import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { nonEmptyString } from "./utils/string-validations";

export const chapterIdParamSchema = z.object({
  chapterId: mongoIdSchema,
});


export const commentIdParamSchema = z.object({
  commentId: mongoIdSchema,
});

export const replyIdParamSchema = z.object({
  replyId: mongoIdSchema,
});


export const baseCommentSchema = z.object({
  chapterId: mongoIdSchema,
  accountId: nonEmptyString("El id de la cuenta"),
  username: nonEmptyString("El nombre de usuario"),
  message: nonEmptyString("El mensaje del comentario"),
  replies: z.array(z.object({
    accountId: nonEmptyString("El id de la cuenta"),
    message: nonEmptyString("El mensaje de la respuesta"),
    likes: z.number().nonnegative().optional().default(0),
  })).optional().default([]),
  likes: z.number().nonnegative().optional().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  id: mongoIdSchema.optional(),
});

export const createCommentSchema = baseCommentSchema.pick({
  chapterId: true,
  accountId: true,
  username: true,
  message: true,
});

export const createReplySchema = z.object({
  accountId: nonEmptyString("El id de la cuenta"),
  message: nonEmptyString("El mensaje de la respuesta"),
});
