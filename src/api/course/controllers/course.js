'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const role = user.role.name;
    if (!['Admin', 'Content Manager', 'Instructor'].includes(role)) {
      return ctx.forbidden('You are not allowed to create courses.');
    }

    // force the instructor field to the logged-in user if they are an Instructor
    // so an Instructor can't create a course and assign it to someone else
    if (role === 'Instructor') {
      ctx.request.body.data.instructor = user.id;
    }

    return super.create(ctx);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const course = await strapi.entityService.findOne('api::course.course', ctx.params.id, {
      populate: ['instructor'],
    });
    if (!course) return ctx.notFound();

    const role = user.role.name;
    const isOwner = course.instructor?.id === user.id;

    if (role === 'Admin' || role === 'Content Manager') {
      return super.update(ctx);
    }
    if (role === 'Instructor' && isOwner) {
      return super.update(ctx);
    }
    return ctx.forbidden('You can only edit your own courses.');
  },

  async delete(ctx) {
    const user = ctx.state.user;
    const course = await strapi.entityService.findOne('api::course.course', ctx.params.id, {
      populate: ['instructor'],
    });
    if (!course) return ctx.notFound();

    const role = user.role.name;
    const isOwner = course.instructor?.id === user.id;

    if (role === 'Admin' || role === 'Content Manager' || (role === 'Instructor' && isOwner)) {
      return super.delete(ctx);
    }
    return ctx.forbidden('You can only delete your own courses.');
  },
}));