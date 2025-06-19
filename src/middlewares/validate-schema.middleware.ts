import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validateSchema = (
  schema: ZodSchema,
  target: ValidationTarget = "body"
) => (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const parsed = schema.safeParse(req[target]);

  if (!parsed.success) {
    res.status(400).json({
      errors: parsed.error.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message,
      })),
    });
    return;
  }

  req[target] = parsed.data;
  next();
};
