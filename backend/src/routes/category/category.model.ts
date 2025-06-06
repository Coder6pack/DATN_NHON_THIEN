import { CategorySchema } from 'src/shared/models/shared-category.model'
import { z } from 'zod'

export const GetAllCategoriesResSchema = z.object({
	data: z.array(CategorySchema),
	totalItems: z.number(),
})

export const GetAllCategoriesQuerySchema = z.object({
	parentCategoryId: z.coerce.number().int().positive().optional(),
})

export const GetCategoryParamsSchema = z
	.object({
		categoryId: z.coerce.number().int().positive(),
	})
	.strict()

export const GetCategoryDetailResSchema = CategorySchema

export const CreateCategoryBodySchema = CategorySchema.pick({
	name: true,
	logo: true,
	parentCategoryId: true,
}).strict()

export const UpdateCategoryBodySchema = z
	.object({
		name: z.string(),
		logo: z.string().nullable(),
	})
	.strict()

export type CategoryType = z.infer<typeof CategorySchema>
export type GetAllCategoriesResType = z.infer<typeof GetAllCategoriesResSchema>
export type GetAllCategoriesQueryType = z.infer<typeof GetAllCategoriesQuerySchema>
export type GetCategoryDetailResType = z.infer<typeof GetCategoryDetailResSchema>
export type CreateCategoryBodyType = z.infer<typeof CreateCategoryBodySchema>
export type GetCategoryParamsType = z.infer<typeof GetCategoryParamsSchema>
export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>
