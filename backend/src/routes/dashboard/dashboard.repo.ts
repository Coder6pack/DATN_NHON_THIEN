import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { DashboardIndicatorResType, GetListOtherDashboardResType } from './dashboard.model'
import { formatInTimeZone } from 'date-fns-tz'
import { PaymentStatus } from 'src/shared/constants/payment.constant'

// Show doanh thu - lợi nhuận - tổng số đơn hàng - đơn đang chờ xử lý
@Injectable()
export class DashboardRepo {
	constructor(private readonly prismaService: PrismaService) {}
	// { fromDate, toDate }: { fromDate: Date; toDate: Date }
	async indicator({ fromDate, toDate }: { fromDate: Date; toDate: Date }): Promise<DashboardIndicatorResType> {
		const orders = (await this.prismaService.order.findMany({
			omit: {
				userId: true,
				receiver: true,
				paymentId: true,
				createdById: true,
				updatedById: true,
				deletedById: true,
				deletedAt: true,
				updatedAt: true,
			},
			include: {
				items: {
					omit: {
						// productName:true,
						image: true,
						skuId: true,
						orderId: true,
						// productId: true,
						skuValue: true,
					},
				},
				products: {
					select: {
						id: true,
						basePrice: true,
						virtualPrice: true,
					},
				},
				payment: {
					select: {
						status: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			where: {
				createdAt: {
					gte: fromDate,
					lte: toDate,
				},
			},
		})) as GetListOtherDashboardResType

		// Doanh thu
		let revenue = 0
		// Lợi nhuận
		let totalProfit = 0
		// Số lượng đơn hàng
		let orderCount = 0
		// Thống kê đơn hàng
		const orderIndicatorObj: {
			id: number
			status: string
			createdAt: Date
			totalPrice: number
			quantity: number
			profit: number
			successOrders: number
		}[] = orders
			.map((order) => {
				const totalPrice = order.items.reduce((sum, item) => sum + item.skuPrice * item.quantity, 0)
				const totalBasePrice = order.items.reduce((sum, item) => {
					if (!item.productId) return sum // Nếu productId là null, bỏ qua
					const product = order.products.find((p) => p.id === item.productId)
					return sum + (product ? product.basePrice * item.quantity : 0)
				}, 0)
				return {
					id: order.id,
					status: order.status,
					createdAt: new Date(order.createdAt),
					totalPrice,
					quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
					profit: totalPrice - totalBasePrice, // Tính lợi nhuận
				}
			})
			.reduce((acc, order) => {
				acc[order.id] = { ...order, successOrders: 0 }
				return acc
			}, {} as any)

		// Doanh thu theo ngày
		// Tạo object revenueByDateObj với key là ngày từ fromDate -> toDate và value là doanh thu
		const revenueByDateObj: { [key: string]: number } = {}
		// Lặp từ fromDate -> toDate
		for (let i = fromDate; i <= toDate; i.setDate(i.getDate() + 1)) {
			revenueByDateObj[formatInTimeZone(i, 'Asia/Saigon', 'dd/MM/yyyy')] = 0
		}

		// Số lượng bàn đang được sử dụng
		const orderNumberObj: { [key: number]: boolean } = {}
		orders.forEach((order) => {
			if (order.payment.status === PaymentStatus.SUCCESS) {
				// Tính doanh thu
				revenue += order.items.reduce((sum, item) => sum + item.skuPrice * item.quantity, 0)
				// Tính lợi nhuận
				const totalPrice = order.items.reduce((sum, item) => sum + item.skuPrice * item.quantity, 0)
				const totalBasePrice = order.items.reduce((sum, item) => {
					if (!item.productId) return sum // Nếu productId là null, bỏ qua
					const product = order.products.find((p) => p.id === item.productId)
					return sum + (product ? product.basePrice * item.quantity : 0)
				}, 0)
				const profit = totalPrice - totalBasePrice
				totalProfit += profit
				orderCount++
				if (order.id && orderIndicatorObj[order.id]) {
					orderIndicatorObj[order.id].successOrders++
				}
				const date = formatInTimeZone(order.createdAt, 'Asia/Saigon', 'dd/MM/yyyy')
				revenueByDateObj[date] =
					(revenueByDateObj[date] ?? 0) + order.items.reduce((sum, item) => sum + item.skuPrice * item.quantity, 0)
			}
			// Đơn hàng đang chờ thanh toán
			if (PaymentStatus.PENDING === order.payment.status && order.id !== null) {
				orderNumberObj[order.id] = true
			}
		})
		// Số lượng đơn hàng đang chờ xử lý
		const servingOrderCount = Object.keys(orderNumberObj).length

		// Doanh thu theo ngày
		const revenueByDate = Object.keys(revenueByDateObj).map((date) => {
			return {
				date,
				revenue: revenueByDateObj[date],
			}
		})
		const orderIndicator = Object.values(orderIndicatorObj)
		return {
			data: {
				revenue,
				totalProfit,
				orderCount,
				servingOrderCount,
				revenueByDate,
				orderIndicator,
			},
			message: 'Get dashboard indicator successfully',
		}
	}
}
