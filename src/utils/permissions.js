async function canManageCourse(strapi, user, courseId) {
  const role = user.role.name;
  if (role === 'Admin' || role === 'Content Manager') return true;
  if (role === 'Instructor') {
    const course = await strapi.entityService.findOne('api::course.course', courseId, {
      populate: ['instructor'],
    });
    return course?.instructor?.id === user.id;
  }
  return false;
}

module.exports = { canManageCourse };