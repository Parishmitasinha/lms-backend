module.exports = {
  routes: [
    { method: "GET", path: "/questions", handler: "question.find" },
    { method: "GET", path: "/questions/:id", handler: "question.findOne" },
    { method: "POST", path: "/questions", handler: "question.create" },
    { method: "PUT", path: "/questions/:id", handler: "question.update" },
    { method: "DELETE", path: "/questions/:id", handler: "question.delete" }
  ]
};
