import { Injectable, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cats.entity';
import { Repository } from 'typeorm';
import { Dogs } from './dogs.entity';
import { CreateDogsDto } from './dto/create-dog.dto';

@Injectable()
export class DogsService {
    constructor(@InjectRepository(Dogs) private dogsRepository: Repository<Dogs>,
     @InjectRepository(Cats) private catsRepository: Repository<Cats>){}

    async getAllDogs(): Promise<Dogs[]> {
        try{
            const allDogs: Dogs[] = await this.dogsRepository.find({ relations: ["friend"] });
            return allDogs;
        }catch(error){
            throw new HttpException(error.message, 404);
        }
    }

    async getOneDog (id:number): Promise<Dogs> {
        try{
            let dog = await this.dogsRepository.findOne(id);
            if(dog){
                return dog;
            } else {
                throw new Error('não achamo o doguinho');
            }
        } catch(error) {
            throw new HttpException(error.message, 404);
        }
    }

    async createADog(createDogsDto: CreateDogsDto): Promise<Dogs> {
        try{
            let dog: Dogs = await this.dogsRepository.create(createDogsDto);
            return this.dogsRepository.save(dog);
            
        } catch (error) {
            throw new HttpException(error.message,400);
        }
    }

    async editADog(id:number , catid, editdogDto: CreateDogsDto): Promise<Dogs> {
        try {
            let dog = await this.dogsRepository.findOne(id);
            if(dog){
                let cat = await this.catsRepository.findOne(catid);
                dog.friend = cat;
                return await this.dogsRepository.save(dog);
            } else throw Error("não encontramos o gato para editar.");
        }catch (error) {
            throw new HttpException(error.message, 404);
        }
    }

    async deleteADog(id: number): Promise<Dogs> { 
        try{
            let dogToRemove = await this.dogsRepository.findOne(id);
            if(dogToRemove)
                return await this.dogsRepository.remove(dogToRemove);
            else throw Error("Não tem o dog para excluir");
        } catch (error) {
            throw new HttpException(error.message, 404);
        }
    }

}