import { BadrequestException } from "../common/helpers/exception.helper";
import { generateCode } from "../common/helpers/generate-code.helper";
import { generatePrefix } from "../common/helpers/generate-prefix-code.helper";
import prisma from "../common/prisma/init.prisma";

export const orderService = {
  create: async function (req) {
    const { userId, foodId, amount, arrSubId } = req.body;

    if (
      !Number.isInteger(userId) ||
      !Number.isInteger(foodId) ||
      !Number.isInteger(amount) ||
      typeof arrSubId !== "string" ||
      userId <= 0 ||
      foodId <= 0 ||
      amount <= 0
    ) {
      throw new BadrequestException("Dữ liệu không hợp lệ");
    }

    const prefix = generatePrefix("ORDER");

    const lastOrder = await prisma.orders.findFirst({
      where: { code: { startsWith: prefix } },
      orderBy: { code: "desc" },
    });

    const newCode = generateCode(lastOrder);

    const result = await prisma.orders.create({
      data: {
        user_id: userId,
        food_id: foodId,
        amount: amount,
        code: newCode,
        arr_sub_id: arrSubId,
      },
    });

    return result;
  },

  findAll: async function (req) {
    return `This action returns all order`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} order`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} order`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} order`;
  },
};
