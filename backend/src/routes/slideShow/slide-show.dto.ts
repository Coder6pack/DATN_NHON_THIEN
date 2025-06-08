import { createZodDto } from 'nestjs-zod'
import {
	CreateSlideShowBodySchema,
	GetListSlideShowSchema,
	GetSlideShowParamsSchema,
	GetSlideShowSchema,
	UpdateSlideShowBodySchema,
} from './slide-show.model'

export class GetSlideShowDTO extends createZodDto(GetSlideShowSchema) {}

export class GetListSlideShowDTO extends createZodDto(GetListSlideShowSchema) {}

export class GetSlideShowParamsDTO extends createZodDto(GetSlideShowParamsSchema) {}

export class CreateSlideShowBodyDTO extends createZodDto(CreateSlideShowBodySchema) {}

export class UpdateSlideShowBodyDTO extends createZodDto(UpdateSlideShowBodySchema) {}
