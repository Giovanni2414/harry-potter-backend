import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Checkout} from "./checkout.entity";
import {CheckoutService} from "./checkout.service";
import {CheckoutController} from "./checkout.controller";
import {CheckoutMapper} from "./checkout.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Checkout])],
    providers: [CheckoutService, CheckoutMapper],
    controllers:[CheckoutController],
    exports:[CheckoutService,CheckoutMapper]
})

export class CheckoutModule {}