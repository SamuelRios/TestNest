import { Cats } from 'src/cats/cats.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Dogs {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    age: number;

    
    @ManyToOne(type => Cats, cat => cat.friend)
    friend: Cats;
}