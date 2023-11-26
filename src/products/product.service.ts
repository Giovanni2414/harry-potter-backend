import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import { ProductMapper } from './product.mapper';
import {Product} from "./product.entity";
import {CreateProductDto} from "./product.dto";
import {ErrorCodes} from "../constants/ErrorConstants";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private productMapper: ProductMapper,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
        try{
            const productFound = await this.findOneByName(createProductDto.name)
            if(productFound===null){
                const newProduct = this.productRepository.create(createProductDto);
                const savedProduct = await this.productRepository.save(newProduct);
                return this.productMapper.mapToDto(savedProduct);
            }else{
                throw new Error(ErrorCodes.EXISTING_PRODUCT)
            }
        }catch (e){
            throw e
        }
    }

    async findAll(): Promise<CreateProductDto[]> {
        try{
            const products: Product[] = await this.productRepository.find();
            return products.map(product => this.productMapper.mapToDto(product));
        } catch (e){
            throw e
        }
    }

    async findOneById(product_id: number): Promise<Product | null> {
        try{
            const product: Product = await this.productRepository.findOneBy({ product_id });
            if(product!==null){
                return product
            }else{
                throw new Error(ErrorCodes.PRODUCT_NOT_FOUND)
            }
        } catch (e){
            throw e
        }
    }

    async findOneByName(name: string): Promise<Product | null>{
        return await this.productRepository.findOneBy({name: Like(`%${name}%`)})
    }

    async update(product_id: number, updateProductDto: CreateProductDto): Promise<CreateProductDto> {
        try {
            await this.findOneById(product_id)
            await this.productRepository.update(product_id, updateProductDto);
            const updatedProduct = await this.productRepository.findOneBy({product_id});
            return this.productMapper.mapToDto(updatedProduct);
        }catch (e){
            throw e
        }
    }

    async remove(id: number): Promise<void> {
        try{
            await this.findOneById(id)
            await this.productRepository.delete(id);
        }catch (e){
            throw e
        }
    }
}