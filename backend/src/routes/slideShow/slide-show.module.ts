import { Module } from '@nestjs/common'
import { SlideShowService } from './slide-show.service'
import { SlideShowRepository } from './slide-show.repo'
import { SlideShowController } from './slide-show.controller'

@Module({
	providers: [SlideShowService, SlideShowRepository],
	controllers: [SlideShowController],
})
export class SlideShowModule {}
