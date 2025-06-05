import {
  BadrequestException,
  NotFoundException,
} from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const rateService = {
  create: async function (req) {
    const { userId, resId, amount } = req.body;

    if (
      !Number.isInteger(userId) ||
      !Number.isInteger(resId) ||
      !Number.isInteger(amount) ||
      userId <= 0 ||
      resId <= 0 ||
      amount <= 0
    ) {
      throw new BadrequestException("Dữ liệu không hợp lệ");
    }

    const existingRate = await prisma.rate_res.findUnique({
      where: {
        user_id_res_id: {
          user_id: userId,
          res_id: resId,
        },
      },
    });

    let result;
    if (existingRate) {
      result = await prisma.rate_res.update({
        where: { id: existingRate.id },
        data: { amount: amount },
      });
    } else {
      result = await prisma.rate_res.create({
      data: {
        user_id: userId,
        res_id: resId,
        amount: amount,
        },
      });
    }

    return result;
  },

  findAll: async function (req) {
    const { userId, resId } = req.body;

    if (
      !Number.isInteger(userId) ||
      !Number.isInteger(resId) ||
      userId <= 0 ||
      resId <= 0
    ) {
      throw new BadrequestException("Dữ liệu không hợp lệ");
    }

    const result = await prisma.rate_res.findUnique({
      where: {
        user_id_res_id: {
          user_id: userId,
          res_id: resId,
        },
      },
    });

    if (!result) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }

    return result;
  },
};
