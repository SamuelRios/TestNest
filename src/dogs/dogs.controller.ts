import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { Dogs } from './dogs.entity';
import { DogsService } from './dogs.service';
import { CreateDogsDto } from './dto/create-dog.dto';
@Controller('dogs')
export class DogsController {
    constructor(private dogsService: DogsService){}

    @Get()
    getAllDogs(): Promise<Dogs[]> {
        return this.dogsService.getAllDogs();
    }

    @Get(':id')
    async getOneDog(@Param('id') id: number): Promise<Dogs> {
        return await this.dogsService.getOneDog(id);
    }

    @Post()
    creatADog(@Body() createDogDto: CreateDogsDto): Promise<Dogs> {
        return this.dogsService.createADog(createDogDto);
    }

    @Put(':id/:catid')
    async editDog(@Param() param, @Body() editDogDto: CreateDogsDto): Promise<Dogs> {
        return await this.dogsService.editADog(param.id, param.catid, editDogDto);
    }

    @Delete(':id')
    deleteADog(@Param('id') id: number): Promise<Dogs> {
        return this.dogsService.deleteADog(id);
    }
}