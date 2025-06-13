import { Injectable } from '@nestjs/common'
import { DashboardRepo } from './dashboard.repo'
import { DashboardIndicatorQueryParamsType } from './dashboard.model'

@Injectable()
export class DashboardService {
	constructor(private readonly dashboardRepo: DashboardRepo) {}
	async indicator({ fromDate, toDate }: DashboardIndicatorQueryParamsType) {
		return await this.dashboardRepo.indicator({ fromDate, toDate })
	}
}
