import { z } from "zod";

export const nonEmptyString = (field: string) => 
    z.string({
        invalid_type_error: `${field} debe ser un string`
    }).trim().nonempty({
        message: `${field} no puede estar vacío`
    });

export const validUrl = (field: string) =>
    z.string({
        invalid_type_error: `${field} debe ser una URL válida`
    }).url({
        message: `${field} debe ser una URL válida`
    });