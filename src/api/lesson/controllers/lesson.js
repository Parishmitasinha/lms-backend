'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
const { canManageCourse } = require('../../../utils/permissions');

module.exports = createCoreController('api::lesson.lesson', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const courseId = ctx.request.body.data.course;
    if (!(await canManageCourse(strapi, user, courseId))) {
      return ctx.forbidden('You cannot add lessons to this course.');
    }
    return super.create(ctx);
  },
  async update(ctx) {
    const user = ctx.state.user;
    const lesson = await strapi.entityService.findOne('api::lesson.lesson', ctx.params.id, { populate: ['course'] });
    if (!lesson) return ctx.notFound();
    if (!(await canManageCourse(strapi, user, lesson.course.id))) {
      return ctx.forbidden('You cannot edit this lesson.');
    }
    return super.update(ctx);
  },
  async delete(ctx) {
    const user = ctx.state.user;
    const lesson = await strapi.entityService.findOne('api::lesson.lesson', ctx.params.id, { populate: ['course'] });
    if (!lesson) return ctx.notFound();
    if (!(await canManageCourse(strapi, user, lesson.course.id))) {
      return ctx.forbidden('You cannot delete this lesson.');
    }
    return super.delete(ctx);
  },
}));