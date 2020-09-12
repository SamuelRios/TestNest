import { Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cat.dto'


@Controller('cats')
export class CatsController {
    constructor( private catsService: CatsService){}

    @Get()
    async getAll() {
        return await this.catsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.catsService.getById(id);
    }

    @Post('')
    async create(@Body() createCatsDto: CreateCatsDto) {
        return await this.catsService.create(createCatsDto);
    }

    @Put(':id/:dogid')
    async editCat(@Param() param, @Body() editCatDto: CreateCatsDto){
        return await this.catsService.editCat(param.id, param.dogid, editCatDto);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.catsService.delete(id);
    }
}