import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { numberGreaterThanOrEqualTo } from "./utils/number-validations";
import { nonEmptyString } from "./utils/string-validations";

export const chapterIdParamSchema = z.object({
    id: mongoIdSchema,
});

export const baseChapterSchema = z.object({
    novelId: mongoIdSchema,
    volumeId: mongoIdSchema.optional(),
    chapterNumber: numberGreaterThanOrEqualTo(1, "El número del capítulo").optional(),
    title: nonEmptyString("El título del capítulo"),
    content: nonEmptyString("El contenido del capítulo"),
    priceMythras: numberGreaterThanOrEqualTo(0, "El precio en Mythras del capítulo").default(0),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    id: mongoIdSchema.optional(),
});

export const createChapterSchema = baseChapterSchema;

export const updateChapterSchema = baseChapterSchema.partial();