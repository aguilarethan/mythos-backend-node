import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { nonEmptyString, validUrl } from "./utils/string-validations";
import { NovelStatus } from "../interfaces/novel.interface";

export const novelIdParamSchema = z.object({
    id: mongoIdSchema,
});

export const novelTitleParamSchema = z.object({
    title: nonEmptyString("El título de la novela"),
});

export const writerAccountIdParamSchema = z.object({
    writerAccountId: nonEmptyString("El id de la cuenta del escritor"),
});

export const baseNovelSchema = z.object({
    writerAccountId: nonEmptyString("El id de la cuenta del escritor"),
    title: nonEmptyString("El título de la novela"),
    description: nonEmptyString("La descripción de la novela"),
    genres: z.array(mongoIdSchema).nonempty({ message: "Debe existir al menos un género en la novela" }),
    tags: z.array(z.string()).optional().default([]),
    coverImage: validUrl("La URL de la imagen de portada").optional(),
    bannerImage: validUrl("La URL de la imagen de banner").optional(),
    status: z.nativeEnum(NovelStatus, { errorMap: () => ({ message: "El estado de la novela es inválido" }) }).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    id: mongoIdSchema.optional(),
});

export const createNovelSchema = baseNovelSchema;

export const updateNovelSchema = baseNovelSchema.partial();
