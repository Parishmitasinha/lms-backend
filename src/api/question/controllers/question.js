"use strict";

module.exports = {
  async find(ctx) {
    ctx.body = { message: "question.find" };
  },
  async findOne(ctx) {
    ctx.body = { message: "question.findOne", id: ctx.params.id };
  },
  async create(ctx) {
    ctx.body = { message: "question.create", data: ctx.request.body };
  },
  async update(ctx) {
    ctx.body = { message: "question.update", id: ctx.params.id, data: ctx.request.body };
  },
  async delete(ctx) {
    ctx.body = { message: "question.delete", id: ctx.params.id };
  },
};
