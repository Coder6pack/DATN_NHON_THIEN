import { Injectable, NotFoundException } from '@nestjs/common'
import { SlideShowRepository } from './slide-show.repo'
import { CreateSlideShowBodyType, UpdateSlideShowBodyType } from './slide-show.model'
import { isNotFoundPrismaError } from 'src/shared/helpers'
import { NotFoundRecordException } from 'src/shared/error'

@Injectable()
export class SlideShowService {
	constructor(private readonly slideShowRepository: SlideShowRepository) {}

	list() {
		return this.slideShowRepository.list()
	}

	async getDetail(id: number) {
		const slideShow = await this.slideShowRepository.getDetail(id)
		if (!slideShow) {
			throw new NotFoundException('Record not found')
		}
		return slideShow
	}

	create({ createdById, data }: { createdById: number; data: CreateSlideShowBodyType }) {
		return this.slideShowRepository.create({ createdById, data })
	}

	async update({ id, updatedById, data }: { id: number; updatedById: number; data: UpdateSlideShowBodyType }) {
		try {
			const slideShow = await this.slideShowRepository.update({
				id,
				updatedById,
				data,
			})
			return slideShow
		} catch (error) {
			if (isNotFoundPrismaError(error)) {
				throw NotFoundRecordException
			}
			throw error
		}
	}

	async delete({ id, deletedById }: { id: number; deletedById: number }) {
		try {
			await this.slideShowRepository.delete({ id, deletedById, isHard: true })
			return {
				message: 'Delete successfully',
			}
		} catch (error) {
			if (isNotFoundPrismaError(error)) {
				throw NotFoundRecordException
			}
			throw error
		}
	}
}
