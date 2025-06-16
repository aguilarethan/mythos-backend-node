import { z } from "zod";
import { nonEmptyString, validUrl } from "./utils/string-validations";

export const baseImageDataSchema = z.object({
    imageId: nonEmptyString("El ID de la imagen"),
    imageUrl: validUrl("La URL de la imagen"),
})