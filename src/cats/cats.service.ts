import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Cats } from './cats.entity';
import { CreateCatsDto } from './dto/create-cat.dto';
import {Dogs} from '../dogs/dogs.entity';


@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cats)
        private catsRepository: Repository<Cats>,
        @InjectRepository(Dogs) private dogsRepository: Repository<Dogs>
    ){}

    async getAll (): Promise<Cats[]> {
        try{
            return  await this.catsRepository.find({ relations: ["friend"] });
        }catch (error) {
            throw new HttpException(error.message, 404);
        }
    }

    async getById (id:number): Promise<Cats> {
        try{
            let cat = await this.catsRepository.findOne(id);
            if(cat){
                console.log(cat.friend);
                console.log("deve mostrar uma coisa antes")
                return cat;
            } else {
                throw Error('nao achei o bichano');
            }
        } catch(error) {
            throw new HttpException(error.message, 404);
        }
    }

    async create(createCatsDto:CreateCatsDto): Promise<Cats> {
        try{
            let cat = await this.catsRepository.create(createCatsDto);
            if(cat){
                return await this.catsRepository.save(cat);
            }else throw Error("Não foi possivel criar gato");

        } catch (error) {
            throw new HttpException(error.message,400);
        }
    }

    async editCat(id:number , dogid, editCatDto: CreateCatsDto): Promise<Cats> {
        try {
            let cat = await this.catsRepository.findOne({ relations: ["friend"], where:{id:id}});
            if(cat){
                let editedCat = await this.catsRepository.create(editCatDto);
                let dog = await this.dogsRepository.findOne(dogid);
                editedCat.friend = cat.friend;
                if(editedCat.friend){
                    editedCat.friend.push(dog);
                }else {
                    editedCat.friend = [dog];
                }
                editedCat.id = cat.id;
                return await this.catsRepository.save(editedCat);
            } else throw Error("não encontramos o gato para editar.");
        }catch (error) {
            throw new HttpException(error.message, 404);
        }
        
    }


    async delete(id: number): Promise<Cats> { 
        try{
            let CatToRemove = await this.catsRepository.findOne(id);
            if(CatToRemove)
                return await this.catsRepository.remove(CatToRemove);
            else throw Error("n encontrei p deletar");
        } catch(error) {
            throw new HttpException(error.message, 404);
        }
    }
}
