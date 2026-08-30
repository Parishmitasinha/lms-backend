module.exports = {
  routes: [
    { method: "GET", path: "/lesson-progresses", handler: "lesson-progress.find" },
    { method: "GET", path: "/lesson-progresses/:id", handler: "lesson-progress.findOne" },
    { method: "POST", path: "/lesson-progresses", handler: "lesson-progress.create" },
    { method: "PUT", path: "/lesson-progresses/:id", handler: "lesson-progress.update" },
    { method: "DELETE", path: "/lesson-progresses/:id", handler: "lesson-progress.delete" }
  ]
};
