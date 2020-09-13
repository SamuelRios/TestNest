import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable} from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Dogs } from '../dogs/dogs.entity';

@Entity()
export class Cats {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 100})
    name: string;
    @Column()
    age: number;

    @ManyToMany(type => Dogs, dog => dog.friend)
    @JoinTable()
    friend: Dogs[];
}