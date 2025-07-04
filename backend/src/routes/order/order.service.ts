import { Injectable } from '@nestjs/common'
import { CreateOrderBodyType, GetOrderListQueryType, UpdateOrderBodyType } from 'src/routes/order/order.model'
import { OrderRepo } from 'src/routes/order/order.repo'

@Injectable()
export class OrderService {
	constructor(private readonly orderRepo: OrderRepo) {}

	async list(userId: number, query: GetOrderListQueryType) {
		return this.orderRepo.list(userId, query)
	}

	async create(userId: number, body: CreateOrderBodyType) {
		const result = await this.orderRepo.create(userId, body)
		return result
	}

	cancel(userId: number, orderId: number) {
		return this.orderRepo.cancel(userId, orderId)
	}

	detail(userId: number, orderId: number) {
		return this.orderRepo.detail(userId, orderId)
	}

	update({ userId, orderId, body }: { userId: number; orderId: number; body: UpdateOrderBodyType }) {
		return this.orderRepo.update({
			userId,
			orderId,
			body,
		})
	}
}
