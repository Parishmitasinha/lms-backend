'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::progress.progress', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;
    const role = user.role.name;

    if (role === 'Student') {
      const filters = { ...(ctx.query.filters || {}), student: user.id };
      const entities = await strapi.entityService.findMany('api::progress.progress', {
        filters,
        populate: ctx.query.populate || {},
      });
      const sanitized = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitized);
    }

    return super.find(ctx);
  },

  async create(ctx) {
    const user = ctx.state.user;
    const data = ctx.request.body?.data || {};

    const entity = await strapi.entityService.create('api::progress.progress', {
      data: {
        ...data,
        student: user.id,
      },
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const progress = await strapi.entityService.findOne('api::progress.progress', ctx.params.id, {
      populate: ['student'],
    });
    if (!progress) return ctx.notFound();
    if (progress.student.id !== user.id && user.role.name !== 'Admin') {
      return ctx.forbidden("You cannot edit someone else's progress.");
    }
    return super.update(ctx);
  },
}));
