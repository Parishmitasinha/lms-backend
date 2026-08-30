module.exports = {
  routes: [
    {
      method: "GET",
      path: "/admin-dashboard/stats",
      handler: "admin-dashboard.stats",
      config: { policies: ["global::is-admin"] }
    },
    {
      method: "POST",
      path: "/admin-dashboard/change-role",
      handler: "admin-dashboard.changeUserRole",
      config: { policies: ["global::is-admin"] }
    }
  ]
};
