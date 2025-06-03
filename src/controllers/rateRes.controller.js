export const rateResController = {
   create: async function (req, res, next) {
      try {
         const result = await rateResService.create(req);
         const response = responseSuccess(result, `Create rateRes successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await rateResService.findAll(req);
         const response = responseSuccess(result, `Get all rateRess successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await rateResService.findOne(req);
         const response = responseSuccess(result, `Get rateRes #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await rateResService.update(req);
         const response = responseSuccess(result, `Update rateRes #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await rateResService.remove(req);
         const response = responseSuccess(result, `Remove rateRes #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   }
};