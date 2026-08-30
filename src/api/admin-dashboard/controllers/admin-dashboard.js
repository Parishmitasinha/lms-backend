"use strict";

module.exports = {
  async stats(ctx) {
    ctx.body = { message: "admin-dashboard.stats" };
  },
  async changeUserRole(ctx) {
    ctx.body = { message: "admin-dashboard.changeUserRole", data: ctx.request.body };
  },
};
