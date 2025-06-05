import { responseSuccess } from "../common/helpers/response.helper";
import { rateService } from "../services/rate.service";

export const rateController = {
  create: async function (req, res, next) {
    try {
      const result = await rateService.create(req);
      const response = responseSuccess(result, `Create rate successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await rateService.findAll(req);
      const response = responseSuccess(result, `Get all rates successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
