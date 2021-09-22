const User = require('./User');
const JobPost = require('./JobPost');
const Events = require('./Events');

User.hasMany(JobPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

JobPost.belongsTo(User, {
  foreignKey: 'user_id',
});

Events.belongsTo(User, {
  foreignkey: 'user_id',
});

JobPost.hasMany(Events, {
  foreignkey: 'job_id',
});

module.exports = { User, JobPost, Events };
