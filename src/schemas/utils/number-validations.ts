import { z } from "zod";

export const numberGreaterThanOrEqualTo = (min: number, field: string) =>
    z.number({
        invalid_type_error: `${field} debe ser un número`,
    }).min(min, {
        message: `${field} debe ser mayor o igual a ${min}`,
    });