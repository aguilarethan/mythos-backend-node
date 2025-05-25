import { z } from "zod";

export const mongoIdSchema = z.string({})
    .nonempty({ 
        message: "El id no puede estar vacío",
    })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "El id no es un id de mongo válido" 
});

