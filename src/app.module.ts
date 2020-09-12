import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cats } from './cats/cats.entity';
import { DogsModule } from './dogs/dogs.module';
import { Dogs } from './dogs/dogs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 42333,
      username: 'home',
      password: 'home',
      database: 'testnest',
      entities: [
        Cats,
        Dogs
      ],
      synchronize: true,
    }),
    CatsModule,
    DogsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
