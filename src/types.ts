import {z} from "zod";

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export type Pagination = z.infer<typeof paginationSchema>;

export const metaSchema = z.object({
  pagination: paginationSchema.optional(),
});

export type Meta = z.infer<typeof metaSchema>;