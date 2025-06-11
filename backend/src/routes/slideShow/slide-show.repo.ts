import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import {
	CreateSlideShowBodyType,
	GetListSlideShowType,
	GetSlideShowType,
	SlideShowType,
	UpdateSlideShowBodyType,
} from './slide-show.model'

@Injectable()
export class SlideShowRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async list(): Promise<GetListSlideShowType> {
		const [totalItems, data] = await Promise.all([
			this.prismaService.slideShow.count(),
			this.prismaService.slideShow.findMany({
				where: {
					deletedAt: null,
				},
			}),
		])
		return {
			data,
			totalItems,
		}
	}

	getDetail(id: number): Promise<GetSlideShowType | null> {
		return this.prismaService.slideShow.findUnique({
			where: {
				id: id,
				deletedAt: null,
			},
		})
	}

	create({ createdById, data }: { createdById: number; data: CreateSlideShowBodyType }): Promise<GetSlideShowType> {
		return this.prismaService.slideShow.create({
			data: {
				createdById,
				...data,
			},
		})
	}

	update({
		id,
		updatedById,
		data,
	}: {
		id: number
		updatedById: number
		data: UpdateSlideShowBodyType
	}): Promise<GetSlideShowType> {
		return this.prismaService.slideShow.update({
			where: {
				id,
			},
			data: {
				updatedById,
				image: data.image,
			},
		})
	}

	delete({ id, deletedById, isHard }: { id: number; deletedById: number; isHard?: boolean }): Promise<SlideShowType> {
		return isHard
			? this.prismaService.slideShow.delete({
					where: {
						id,
					},
				})
			: this.prismaService.slideShow.update({
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
