import { Cats } from 'src/cats/cats.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Dogs {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    age: number;

    
    @ManyToMany(type => Cats, cat => cat.friend)
    friend: Cats[];
}