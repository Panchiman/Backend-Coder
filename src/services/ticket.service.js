import { v4 as uuidv4 } from 'uuid';

export default class TicketDTO{
    constructor(products, price, purchaser) {
        this.code = uuidv4(),
        this.purchase_datetime = new Date(),
        this.products = products
        this.price = price,
        this.purchaser = purchaser
    }
}