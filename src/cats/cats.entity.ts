import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { OneToMany, JoinColumn } from 'typeorm';
import { Dogs } from '../dogs/dogs.entity';

@Entity()
export class Cats {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 100})
    name: string;
    @Column()
    age: number;

    @OneToMany(type => Dogs, dog => dog.friend)
    friend: Dogs[];
}