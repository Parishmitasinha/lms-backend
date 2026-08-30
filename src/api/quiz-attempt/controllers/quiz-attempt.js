'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz-attempt.quiz-attempt', ({ strapi }) => ({
  async submit(ctx) {
    const user = ctx.state.user;
    if (!user || user.role.name !== 'Student') {
      return ctx.forbidden('Only students can submit quiz attempts.');
    }

    const { quizId, answers } = ctx.request.body;
    if (!quizId || !Array.isArray(answers)) {
      return ctx.badRequest('quizId and answers are required.');
    }

    const quiz = await strapi.entityService.findOne('api::quiz.quiz', quizId);
    if (!quiz) return ctx.notFound('Quiz not found.');

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) correctCount++;
    });
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    const attempt = await strapi.entityService.create('api::quiz-attempt.quiz-attempt', {
      data: { student: user.id, quiz: quizId, score, answers },
    });

    ctx.send({ score, correctCount, total: quiz.questions.length, attempt });
  },
}));