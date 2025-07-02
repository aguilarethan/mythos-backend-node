import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { nonEmptyString, validUrl } from "./utils/string-validations";
import { numberGreaterThanOrEqualTo } from "./utils/number-validations";
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
    writerName: nonEmptyString("El nombre del escritor"),
    title: nonEmptyString("El título de la novela"),
    description: nonEmptyString("La descripción de la novela"),
    genres: z.array(z.string()).nonempty({ message: "Debe existir al menos un género en la novela" }),
    tags: z.array(z.string()).optional().default([]),
    views: numberGreaterThanOrEqualTo(0, "Las vistas de la novela").default(0),
    isPublic: z.boolean().optional().default(true),
    coverImageUrl: validUrl("La URL de la imagen de portada"),
    status: z.nativeEnum(NovelStatus, { errorMap: () => ({ message: "El estado de la novela es inválido" }) }).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    id: mongoIdSchema.optional(),
});

export const createNovelSchema = baseNovelSchema;

export const updateNovelSchema = baseNovelSchema.partial();
