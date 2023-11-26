import {Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus} from '@nestjs/common';
import {ProductMapper} from "./product.mapper";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./product.dto";
import {Product} from "./product.entity";


@Controller('products')
export class ProductController {
    constructor(private productService: ProductService, private productMapper: ProductMapper, ) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto, @Res() response) {
        try{
            const createdProduct:CreateProductDto = await this.productService.create(createProductDto);
            response.status(HttpStatus.CREATED).send(createdProduct)
        }catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get()
    async findAll(@Res() response){
        try{
            const products: CreateProductDto[] = await this.productService.findAll();
            response.status(HttpStatus.OK).send(products)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response) {
        try{
            const product:Product = await this.productService.findOneById(+id);
            response.status(HttpStatus.OK).send(this.productMapper.mapToDto(product))
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto, @Res() response){
        try{
            const updatedProduct = await this.productService.update(+id, updateProductDto);
            response.status(HttpStatus.OK).send(updatedProduct)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response){
        try{
            await this.productService.remove(+id);
            response.status(HttpStatus.OK).send('Product successfully removed')
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }
}