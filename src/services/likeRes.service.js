export const likeResService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all likeRes`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} likeRes`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} likeRes`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} likeRes`;
  },
};
