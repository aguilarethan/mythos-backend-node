import { z } from "zod";
import { mongoIdSchema } from "./common.schema";
import { nonEmptyString } from "./utils/string-validations";
import { ReportStatus } from "../interfaces/novel-report.interface";

export const baseNovelReportSchema = z.object({
    novelId: mongoIdSchema,
    reporterAccountId: nonEmptyString("El id de la cuenta del reportante"),
    reason: nonEmptyString("El motivo del reporte"),
    description: nonEmptyString("La descripción del reporte"),
    status: z.nativeEnum(ReportStatus, { errorMap: () => ({ message: "El estado del reporte es inválido" }) }).optional().default(ReportStatus.PENDING),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    id: mongoIdSchema.optional(),
});

export const createNovelReportSchema = baseNovelReportSchema;

export const updateNovelReportSchema = baseNovelReportSchema.partial();