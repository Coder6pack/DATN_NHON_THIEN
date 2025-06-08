import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SlideShowService } from './slide-show.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
	CreateSlideShowBodyDTO,
	GetListSlideShowDTO,
	GetSlideShowDTO,
	GetSlideShowParamsDTO,
	UpdateSlideShowBodyDTO,
} from './slide-show.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { IsPublic } from 'src/shared/decorators/auth.decorator'

@Controller('slideshows')
export class SlideShowController {
	constructor(private readonly slideShowService: SlideShowService) {}

	@IsPublic()
	@Get()
	@ZodSerializerDto(GetListSlideShowDTO)
	getList() {
		return this.slideShowService.list()
	}

	@Get(':slideShowId')
	@ZodSerializerDto(GetSlideShowDTO)
	getDetail(@Param() params: GetSlideShowParamsDTO) {
		return this.slideShowService.getDetail(params.slideShowId)
	}

	@Post()
	@ZodSerializerDto(GetSlideShowDTO)
	create(@Body() body: CreateSlideShowBodyDTO, @ActiveUser('userId') userId: number) {
		return this.slideShowService.create({
			createdById: userId,
			data: body,
		})
	}

	@Put(':slideShowId')
	@ZodSerializerDto(GetSlideShowDTO)
	update(
		@Body() body: UpdateSlideShowBodyDTO,
		@ActiveUser('userId') userId: number,
		@Param() params: GetSlideShowParamsDTO,
	) {
		return this.slideShowService.update({ id: params.slideShowId, updatedById: userId, data: body })
	}

	@Delete(':slideShowId')
	@ZodSerializerDto(MessageResDTO)
	delete(@Param() params: GetSlideShowParamsDTO, @ActiveUser('userId') userId: number) {
		return this.slideShowService.delete({
			id: params.slideShowId,
			deletedById: userId,
		})
	}
}
