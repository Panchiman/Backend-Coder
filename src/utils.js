import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { faker } from "@faker-js/faker";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateProduct = () => {
  return {
      title: faker.commerce.productName(),
      stock: Number(faker.string.numeric({allowLeadingZeros: false, length: { min: 1, max: 2 } })),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(10),
      price: Number(faker.commerce.price({ min: 1 })),
      category: faker.commerce.department(),
      status: true
  };
};


export default __dirname;