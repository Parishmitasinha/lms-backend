"use strict";

module.exports = async (policyContext, config, { strapi }) => {
  const user = policyContext?.state?.user;
  return !!user && user.role?.type === "admin";
};
