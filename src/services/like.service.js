import {
  BadrequestException,
  NotFoundException,
} from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const likeService = {
  create: async function (req) {
    const { userId, resId } = req.body;

    if (
      !Number.isInteger(userId) ||
      !Number.isInteger(resId) ||
      userId <= 0 ||
      resId <= 0
    ) {
      throw new BadrequestException("Dữ liệu không hợp lệ");
    }

    const isLike = await prisma.like_res.findUnique({
      where: {
        user_id_res_id: {
          user_id: userId,
          res_id: resId,
        },
      },
      select: {
        id: true,
        is_like: true,
      },
    });

    let result;
    if (isLike) {
      result = await prisma.like_res.update({
        where: {
          id: isLike.id,
        },
        data: {
          is_like: !isLike.is_like,
        },
      });
    } else {
      result = await prisma.like_res.create({
        data: {
          user_id: userId,
          res_id: resId,
          is_like: true,
        },
      });
    }

    return {
      is_like: result.is_like,
      date_like: result.date_like,
      action: isLike ? "updated" : "created",
    };
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

    const result = await prisma.like_res.findUnique({
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
