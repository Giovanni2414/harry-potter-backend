import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from "../users/user.entity";

@Entity('checkouts')
export class Checkout {
    @PrimaryGeneratedColumn()
    checkout_id: number;

    @Column({ length: 255 })
    payment: string;

    @Column()
    total: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, { eager: true }) // eager: true cargará la relación automáticamente cuando consultes productos
    @JoinColumn({ name: 'user_id' })
    user: User;
}