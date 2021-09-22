const User = require('./User');
const JobPost = require('./JobPost');
const Events = require('./Events');

User.hasMany(JobPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Events, {
  foreignKey: 'user_id',
  onDelete: 'Cascade',
});

JobPost.belongsTo(User, {
  foreignKey: 'user_id',
});

JobPost.hasMany(Events, {
  foreignkey: 'job_id',
  onDelete: 'CASCADE',
});

module.exports = { User, JobPost, Events };
