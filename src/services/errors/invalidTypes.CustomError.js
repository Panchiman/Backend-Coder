export const invalidTypesGenerateCause = (tipos)=>{
   let message = ``
   for (const variable in tipos){
    message = message + variable + `debe ser:` + tipos[variable] + `,`
   }
}