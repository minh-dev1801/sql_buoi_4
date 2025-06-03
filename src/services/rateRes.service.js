export const rateResService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all rateRes`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} rateRes`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} rateRes`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} rateRes`;
   },
};