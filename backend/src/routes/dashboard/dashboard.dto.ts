import { createZodDto } from 'nestjs-zod'
import { DashboardIndicatorQueryParamsSchema, DashboardIndicatorResSchema } from './dashboard.model'

export class DashboardIndicatorResDTO extends createZodDto(DashboardIndicatorResSchema) {}

export class DashboardIndicatorQueryParamsDTO extends createZodDto(DashboardIndicatorQueryParamsSchema) {}
