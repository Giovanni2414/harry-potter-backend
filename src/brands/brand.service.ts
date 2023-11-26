import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {BrandMapper} from './brand.mapper';
import {Brand} from "./brand.entity";
import {CreateBrandDto} from "./brand.dto";
import {ErrorCodes} from "../constants/ErrorConstants";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
        private readonly brandMapper: BrandMapper,
    ) {
    }

    async create(createBrandDto: CreateBrandDto): Promise<CreateBrandDto> {
        try{
            const brandFound: Brand  = await this.findOneByName(createBrandDto.name)
            if(brandFound===null){
                const newBrand = this.brandRepository.create(createBrandDto);
                const savedBrand = await this.brandRepository.save(newBrand);
                return this.brandMapper.mapToDto(savedBrand);
            }else{
                throw new Error(ErrorCodes.EXISTING_BRAND)
            }
        }catch (e){
            throw e
        }
    }

    async findAll(): Promise<CreateBrandDto[]> {
        try{
            const brands = await this.brandRepository.find();
            return brands.map(brand => this.brandMapper.mapToDto(brand));
        }catch (e){
            throw e
        }
    }

    async findOneById(id: number): Promise<CreateBrandDto> {
        try {
            const brand:Brand = await this.brandRepository.findOneBy({brand_id: id});
            if (brand !== null) {
                return this.brandMapper.mapToDto(brand);
            } else {
                throw new Error(ErrorCodes.BRAND_NOT_FOUND)
            }
        } catch (e) {
            throw e
        }
    }

    async findOneByName(name: string): Promise<Brand | null> {
        return await this.brandRepository.findOneBy({name: Like(`%${name}%`)});
    }

    async update(id: number, updateBrandDto: CreateBrandDto): Promise<CreateBrandDto> {
        try{
            await this.findOneById(id);
            await this.brandRepository.update(id, updateBrandDto);
            const updatedBrand = await this.brandRepository.findOneBy({brand_id: id});
            return this.brandMapper.mapToDto(updatedBrand);
        } catch (e){
            throw e
        }
    }

    async remove(id: number): Promise<void> {
        try{
            await this.findOneById(id)
            await this.brandRepository.delete(id);
        } catch (e){
            throw e
        }
    }
}