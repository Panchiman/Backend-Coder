import CustomError from "../services/DTO/customError.service.js";
import { ErrorEnum } from "../services/ENUMS/error.enum.js";



export const addProductController = async (product) => {
    if (!product){
        CustomError.createError({
            name: "product creation error",
            cause: "debe enviarse un producto",
            message: "error trying to add a product",
            code: ErrorEnum.INVALID_TYPES_ERROR,
          });

    }
    if (!typeof product.title == String ||!typeof product.description  == String||!typeof product.price == Number||!typeof product.category  == String||!typeof product.status == Boolean||!typeof product.code  == String||!typeof product.stock == Number){
        CustomError.createError({
            name: "product creation error",
            cause: "Los campos para ser correctos deben ser: title=string, description=string, price=number, category=string, status=bolean, code=string, stock=number",
            message: "error trying to add a product",
            code: ErrorEnum.INVALID_TYPES_ERROR,
          });
    }
}



  
