import { v4 as uuidv4 } from 'uuid';

export default class ticketDTO{
    constructor(products, amount, purchaser) {
        this.code = uuidv4(),
        this.purchase_datetime = new Date(),
        this.products = products
        this.amount = amount,
        this.purchaser = purchaser
    }
}