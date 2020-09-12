import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dogs } from './dogs.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Cats } from 'src/cats/cats.entity';
@Module({
    imports: [TypeOrmModule.forFeature([ Dogs, Cats])],
    controllers: [DogsController],
    providers: [DogsService],

})
export class DogsModule {}
