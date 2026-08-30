'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
const { canManageCourse } = require('../../../utils/permissions');

module.exports = createCoreController('api::quiz.quiz', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const courseId = ctx.request.body.data.course;
    if (!(await canManageCourse(strapi, user, courseId))) {
      return ctx.forbidden('You cannot add a quiz to this course.');
    }
    return super.create(ctx);
  },
  async update(ctx) {
    const user = ctx.state.user;
    const quiz = await strapi.entityService.findOne('api::quiz.quiz', ctx.params.id, { populate: ['course'] });
    if (!quiz) return ctx.notFound();
    if (!(await canManageCourse(strapi, user, quiz.course.id))) {
      return ctx.forbidden('You cannot edit this quiz.');
    }
    return super.update(ctx);
  },
  async delete(ctx) {
    const user = ctx.state.user;
    const quiz = await strapi.entityService.findOne('api::quiz.quiz', ctx.params.id, { populate: ['course'] });
    if (!quiz) return ctx.notFound();
    if (!(await canManageCourse(strapi, user, quiz.course.id))) {
      return ctx.forbidden('You cannot delete this quiz.');
    }
    return super.delete(ctx);
  },
}));