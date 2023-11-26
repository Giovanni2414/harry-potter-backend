import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {User} from "../users/user.entity";
import {Product} from "../products/product.entity";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;

    @Column({ length: 255 })
    comment: string;

    @Column({ type: 'float' })
    stars: number;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'id' })
    user: User;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}