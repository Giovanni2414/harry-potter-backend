import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CheckoutMapper} from './checkout.mapper';
import {Checkout} from "./checkout.entity";
import {CreateCheckoutDto} from "./checkout.dto";
import {ErrorCodes} from "../constants/ErrorConstants";

const stripe = require('stripe')('sk_test_51OHb2NAW7xQWIx2NvTXpxErHCZ2pJOPBcO9MX5xQ7yGnCdJHs4rIDOz9hcJ3YHEV8KbA10gRArv7fkkg75wy5TNk00JvQM1Dmx');

@Injectable()
export class CheckoutService {
    constructor(
        @InjectRepository(Checkout)
        private readonly checkoutRepository: Repository<Checkout>,
        private readonly checkoutMapper: CheckoutMapper
    ) {
    }

    async create(createCheckoutDto: CreateCheckoutDto): Promise<CreateCheckoutDto> {
        const newCheckout = this.checkoutRepository.create(createCheckoutDto);
        const savedCheckout = await this.checkoutRepository.save(newCheckout);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: savedCheckout.total,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const responseCheckout = new CreateCheckoutDto()

        responseCheckout.payment = savedCheckout.payment
        responseCheckout.total = savedCheckout.total
        responseCheckout.user_id = savedCheckout.user_id
        responseCheckout.secret = paymentIntent.client_secret

        return responseCheckout
    }

    async findAll(): Promise<CreateCheckoutDto[]> {
        const checkouts = await this.checkoutRepository.find();
        return checkouts.map(checkout => this.checkoutMapper.mapToDto(checkout));
    }

    async findOneById(id: number): Promise<CreateCheckoutDto> {
        const checkout: Checkout = await this.checkoutRepository.findOneBy({checkout_id: id});
        if (checkout !== null) {
            return this.checkoutMapper.mapToDto(checkout);
        } else {
            throw new Error(ErrorCodes.BRAND_NOT_FOUND)
        }
    }

    async update(id: number, updateCheckoutDto: CreateCheckoutDto): Promise<CreateCheckoutDto> {
        await this.findOneById(id);
        await this.checkoutRepository.update(id, updateCheckoutDto);
        const updatedCheckout = await this.checkoutRepository.findOneBy({checkout_id: id});
        return this.checkoutMapper.mapToDto(updatedCheckout);
    }

    async remove(id: number): Promise<void> {
        await this.findOneById(id)
        await this.checkoutRepository.delete(id);
    }
}