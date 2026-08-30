'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!['Admin', 'Content Manager'].includes(user.role.name)) {
      return ctx.forbidden('You cannot create blog posts.');
    }
    ctx.request.body.data.author = user.id;
    return super.create(ctx);
  },
  async update(ctx) {
    const user = ctx.state.user;
    const post = await strapi.entityService.findOne('api::blog-post.blog-post', ctx.params.id, { populate: ['author'] });
    if (!post) return ctx.notFound();
    const isAdmin = user.role.name === 'Admin';
    const isOwner = user.role.name === 'Content Manager' && post.author?.id === user.id;
    if (!isAdmin && !isOwner) return ctx.forbidden('You can only edit your own posts.');
    return super.update(ctx);
  },
  async delete(ctx) {
    const user = ctx.state.user;
    const post = await strapi.entityService.findOne('api::blog-post.blog-post', ctx.params.id, { populate: ['author'] });
    if (!post) return ctx.notFound();
    const isAdmin = user.role.name === 'Admin';
    const isOwner = user.role.name === 'Content Manager' && post.author?.id === user.id;
    if (!isAdmin && !isOwner) return ctx.forbidden('You can only delete your own posts.');
    return super.delete(ctx);
  },
}));