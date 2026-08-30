'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::enrollment.enrollment', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user || user.role.name !== 'Student') {
      return ctx.forbidden('Only students can enroll.');
    }

    const courseId = ctx.request.body?.data?.course;
    if (!courseId) {
      return ctx.badRequest('course is required');
    }

    const entity = await strapi.entityService.create('api::enrollment.enrollment', {
      data: {
        student: user.id,
        course: courseId,
      },
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async find(ctx) {
    const user = ctx.state.user;

    if (user.role.name === 'Student') {
      const entities = await strapi.entityService.findMany('api::enrollment.enrollment', {
        filters: { student: user.id },
        populate: {
          course: {
            populate: ['lessons'],
          },
        },
      });
      const sanitized = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitized);
    }

    return super.find(ctx);
  },
}));
