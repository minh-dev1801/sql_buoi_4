import { generatePrefix } from "./generate-prefix-code.helper";

export const generateCode = (lastOrder) => {
  const prefix = generatePrefix("ORDER");

  let newNumber = 1;
  if (lastOrder) {
    const lastNumber = parseInt(lastOrder.code.split("-")[2], 10);
    newNumber = lastNumber + 1;
  }

  return `${prefix}${newNumber.toString().padStart(3, "0")}`;
};
