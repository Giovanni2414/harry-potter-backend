import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id: number;

    @Column({ length: 255 })
    name: string;
}