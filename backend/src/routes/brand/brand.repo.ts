import { Injectable } from '@nestjs/common'
import {
	CreateBrandBodyType,
	GetBrandsResType,
	UpdateBrandBodyType,
	BrandType,
	GetBrandDetailResType,
} from 'src/routes/brand/brand.model'
import { PaginationQueryType } from 'src/shared/models/request.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class BrandRepo {
	constructor(private prismaService: PrismaService) {}

	async list(pagination: PaginationQueryType): Promise<GetBrandsResType> {
		const skip = (pagination.page - 1) * pagination.limit
		const take = pagination.limit
		const [totalItems, data] = await Promise.all([
			this.prismaService.brand.count({
				where: {
					deletedAt: null,
				},
			}),
			this.prismaService.brand.findMany({
				where: {
					deletedAt: null,
				},
				orderBy: {
					createdAt: 'desc',
				},
				skip,
				take,
			}),
		])
		return {
			data,
			totalItems,
			page: pagination.page,
			limit: pagination.limit,
			totalPages: Math.ceil(totalItems / pagination.limit),
		}
	}

	findById(id: number): Promise<GetBrandDetailResType | null> {
		return this.prismaService.brand.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})
	}

	create({
		createdById,
		data,
	}: {
		createdById: number | null
		data: CreateBrandBodyType
	}): Promise<GetBrandDetailResType> {
		return this.prismaService.brand.create({
			data: {
				...data,
				createdById,
			},
		})
	}

	async update({
		id,
		updatedById,
		data,
	}: {
		id: number
		updatedById: number
		data: UpdateBrandBodyType
	}): Promise<GetBrandDetailResType> {
		return this.prismaService.brand.update({
			where: {
				id,
				deletedAt: null,
			},
			data: {
				...data,
				updatedById,
			},
		})
	}

	delete(
		{
			id,
			deletedById,
		}: {
			id: number
			deletedById: number
		},
		isHard?: boolean,
	): Promise<BrandType> {
		return isHard
			? this.prismaService.brand.delete({
					where: {
						id,
					},
				})
			: this.prismaService.brand.update({
					where: {
						id,
						deletedAt: null,
					},
					data: {
						deletedAt: new Date(),
						deletedById,
					},
				})
	}
}
