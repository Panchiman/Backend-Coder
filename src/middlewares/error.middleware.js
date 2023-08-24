import { ErrorEnum } from "../services/ENUMS/error.enum.js";

export const errorMiddleware = (error, req, res, next) => {
  console.log("error")
  console.log(error.cause);
  switch (error.code) {
    case ErrorEnum.INVALID_TYPES_ERROR:
      res.send({ status: "error", error: error.name, cause: error.cause, general_description: "Uno o mas campos eran de tipos incorrectos"});
      break;
    case ErrorEnum.PARAM_ERROR:
      res.send({ status: "error", error: error.name, cause: error.cause, general_description: "Error en uno o mas parametros"});
      
      case ErrorEnum.DATABASE_ERROR:
        res.send({ status: "error", error: error.name, cause: error.cause, general_description:"No se pudo encontrar en la base de datos" });
        break
      case ErrorEnum.EMPTY_FIELD_ERROR:
        res.send({ status: "error", error: error.name, cause: error.cause, general_description:"Alguno de los campos obligatorios estaba vacio" });
        break
    default:
      res.send({ status: "error", mensaje: "error no manejado" });
  }
};