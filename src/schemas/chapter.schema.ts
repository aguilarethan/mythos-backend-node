import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { numberGreaterThanOrEqualTo } from "./utils/number-validations";
import { nonEmptyString } from "./utils/string-validations";

export const chapterIdParamSchema = z.object({
    id: mongoIdSchema,
});

export const novelIdParamSchema = z.object({
    id: mongoIdSchema,
});

export const baseChapterSchema = z.object({
    novelId: mongoIdSchema,
    volumeId: mongoIdSchema,
    chapterNumber: numberGreaterThanOrEqualTo(1, "El número del capítulo"),
});