const User = require('./User');
const JobPost = require('./JobPost');

User.hasMany(JobPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

JobPost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, JobPost };
