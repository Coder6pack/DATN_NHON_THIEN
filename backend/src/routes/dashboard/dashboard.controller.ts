import { Controller, Get, Query } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardIndicatorQueryParamsDTO, DashboardIndicatorResDTO } from './dashboard.dto'
import { ZodSerializerDto } from 'nestjs-zod'

@Controller('dashboards')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get()
	@ZodSerializerDto(DashboardIndicatorResDTO)
	indicator(@Query() queryString: DashboardIndicatorQueryParamsDTO) {
		return this.dashboardService.indicator({
			fromDate: queryString.fromDate,
			toDate: queryString.toDate,
		})
	}
}
