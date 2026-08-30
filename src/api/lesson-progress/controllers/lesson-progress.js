"use strict";

module.exports = {
  async find(ctx) {
    ctx.body = { message: "lesson-progress.find" };
  },
  async findOne(ctx) {
    ctx.body = { message: "lesson-progress.findOne", id: ctx.params.id };
  },
  async create(ctx) {
    ctx.body = { message: "lesson-progress.create", data: ctx.request.body };
  },
  async update(ctx) {
    ctx.body = { message: "lesson-progress.update", id: ctx.params.id, data: ctx.request.body };
  },
  async delete(ctx) {
    ctx.body = { message: "lesson-progress.delete", id: ctx.params.id };
  },
};
