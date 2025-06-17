import { z } from "zod";
import { nonEmptyString } from "./utils/string-validations";
import { mongoIdSchema } from "./common.schema";

export const accountIdParamSchema = z.object({
    accountId: mongoIdSchema,
});

export const preferencesSchema = z.object({
    accountId: nonEmptyString("El ID de cuenta del lector"),
    fontSize: z.number().min(10).max(20),
    fontFamily: nonEmptyString("La fuente"),
    lineSpacing: z.number().min(1).max(5),
    theme: z.enum(["Claro", "Oscuro"]),
});

export const updatePreferencesSchema = preferencesSchema.partial();