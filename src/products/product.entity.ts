import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Brand} from "../brands/brand.entity";


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, nullable: true })
    subtitle: string;

    @Column({ length: 255 })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'float' })
    calification: number;

    @Column()
    brand_id: number;

    @Column({length: 255, nullable: true })
    image_url: string;

    @ManyToOne(() => Brand, { eager: true }) // eager: true cargará la relación automáticamente cuando consultes productos
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

}