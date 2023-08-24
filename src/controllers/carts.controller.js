import { isValidObjectId } from "mongoose";
import CustomError from "../services/DTO/customError.service.js";
import { ErrorEnum } from "../services/ENUMS/error.enum.js";

export const addCartByIdController = async (cart) => {
    if (!cart) {
        CustomError.createError({
            name: "error al obtener el carrito",
            cause: "El carrito no se encuentra en nuestra base de datos",
            code: ErrorEnum.DATABASE_ERROR,
          });
    }
}

export const addToCartController = async (idCart,idProduct) => {
    if (!idCart || !idProduct || idCart.includes(" ")||idProduct.includes(" ")) {
        CustomError.createError({
            name: "error al agregar al carrito",
            cause: "Debe ingresar una id del carrito y del producto a agregar",
            code: ErrorEnum.PARAM_ERROR,
          });
    }
}