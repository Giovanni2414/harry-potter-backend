import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CheckoutService} from "./checkout.service";
import {CheckoutMapper} from "./checkout.mapper";
import {CreateCheckoutDto} from "./checkout.dto";

@Controller('checkout')
export class CheckoutController {
    constructor(private checkoutService: CheckoutService, private checkoutMapper: CheckoutMapper) {
    }

    @Post()
    async create(@Body() createCheckoutDto: CreateCheckoutDto, @Res() response) {
        try {
            const createdCheckout: CreateCheckoutDto = await this.checkoutService.create(createCheckoutDto);
            response.status(HttpStatus.CREATED).send(createdCheckout)
        } catch (e) {
            console.error(e)
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get()
    async findAll(@Res() response) {
        try {
            const checkouts: CreateCheckoutDto[] = await this.checkoutService.findAll();
            response.status(HttpStatus.OK).send(checkouts)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message())
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() response) {
        try {
            const checkout: CreateCheckoutDto = await this.checkoutService.findOneById(+id);
            response.status(HttpStatus.OK).send(checkout)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCheckoutDto: CreateCheckoutDto, @Res() response) {
        try {
            const updatedCheckout: CreateCheckoutDto = await this.checkoutService.update(+id, updateCheckoutDto);
            response.status(HttpStatus.BAD_REQUEST).send(updatedCheckout)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response): Promise<void> {
        try {
            await this.checkoutService.remove(+id);
            response.status(HttpStatus.OK).send('Brand successfully removed')
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }
}
