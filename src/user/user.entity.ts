import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    department: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({default: ''})
    password: string;
}