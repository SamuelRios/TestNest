import { Cats } from 'src/cats/cats.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Dogs {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    age: number;

    
    @OneToOne(type => Cats, cat => cat.friend)
    friend: Cats;
}