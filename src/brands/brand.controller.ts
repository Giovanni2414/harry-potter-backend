import {Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus} from '@nestjs/common';
import {CreateBrandDto} from "./brand.dto";
import {BrandService} from "./brand.service";
import {BrandMapper} from "./brand.mapper";

@Controller('brands')
export class BrandController {
    constructor(private brandService: BrandService, private brandMapper: BrandMapper) {}

    @Post()
    async create(@Body() createBrandDto: CreateBrandDto, @Res() response) {
        try {
            const createdBrand: CreateBrandDto = await this.brandService.create(createBrandDto);
            response.status(HttpStatus.CREATED).send(createdBrand)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get()
    async findAll(@Res() response) {
        try {
            const brands: CreateBrandDto[] = await this.brandService.findAll();
            response.status(HttpStatus.OK).send(brands)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message())
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() response) {
        try {
            const brand: CreateBrandDto = await this.brandService.findOneById(+id);
            response.status(HttpStatus.OK).send(brand)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBrandDto: CreateBrandDto, @Res() response) {
        try{
            const updatedBrand: CreateBrandDto = await this.brandService.update(+id, updateBrandDto);
            response.status(HttpStatus.BAD_REQUEST).send(updatedBrand)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response): Promise<void> {
        try{
            await this.brandService.remove(+id);
            response.status(HttpStatus.OK).send('Brand successfully removed')
        }catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }
}
