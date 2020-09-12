import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { Dogs } from 'src/dogs/dogs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cats, Dogs])],
    controllers: [ CatsController ],
    providers: [ CatsService ],
})
export class CatsModule {}
