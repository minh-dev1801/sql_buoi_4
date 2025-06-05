import { responseSuccess } from "../common/helpers/response.helper";
import { likeService } from "../services/like.service";

export const likeController = {
  create: async function (req, res, next) {
    try {
      let result = await likeService.create(req);

      result = {
        ...result,
        action: undefined,
      };

      const response = responseSuccess(
        result,
        result.action === "created"
          ? "Create like successfully"
          : "Update like successfully",
        result.action === "created" ? 201 : 200
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await likeService.findAll(req);
      const response = responseSuccess(result, `Get all likes successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
