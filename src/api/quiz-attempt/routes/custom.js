module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/quiz-attempts/submit',
      handler: 'quiz-attempt.submit',
      config: { policies: [] },
    },
  ],
};