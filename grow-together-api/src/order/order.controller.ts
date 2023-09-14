import { Body, Controller, Post } from '@nestjs/common';
import { orderDto } from './DTOs/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private orderService:OrderService){}
    @Post('addOrder')
    addOrder(@Body() orderDto:orderDto)
    {
        return this.orderService.addOrder(orderDto);
    }
}
