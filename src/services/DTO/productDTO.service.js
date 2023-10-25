export default class ProductDTO{
    constructor(product, role, creatorEmail) {
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.category = product.category,
        this.thumbnail = product.thumbnail,
        this.status = product.status,
        this.code = product.code,
        this.stock = product.stock,
        this.creatorRole = role,
        this.creatorEmail = creatorEmail
    }
}