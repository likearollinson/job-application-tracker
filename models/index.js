const User = require('./User');
const JobPost = require('./JobPost');
const Events = require('./Events');
const JobEvents = require('./JobEvents');

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

JobPost.belongsToMany(Events, {
  through: JobEvents,
  unique: false,
  foreignkey: 'job_id',
});

module.exports = { User, JobPost, Events, JobEvents };
