import { responseSuccess } from "../common/helpers/response.helper";
import { likeResService } from "../services/likeRes.service";

export const likeResController = {
  create: async function (req, res, next) {
    try {
      const result = await likeResService.create(req);
      const response = responseSuccess(result, `Create likeRes successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await likeResService.findAll(req);
      const response = responseSuccess(result, `Get all likeRess successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await likeResService.findOne(req);
      const response = responseSuccess(
        result,
        `Get likeRes #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await likeResService.update(req);
      const response = responseSuccess(
        result,
        `Update likeRes #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await likeResService.remove(req);
      const response = responseSuccess(
        result,
        `Remove likeRes #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
