import { SKUSchema } from "@/shared/models/shared-sku.model";
import { z } from "zod";

export const UpsertSKUBodySchema = SKUSchema.pick({
  value: true,
  price: true,
  stock: true,
  image: true,
});

export type UpsertSKUBodyType = z.infer<typeof UpsertSKUBodySchema>;
