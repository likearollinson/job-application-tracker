const sequelize = require('../config/connection');
const { User, JobPost } = require('../models');

const userData = require('./userData.json');
const jobData = require('./jobData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const job of jobData) {
    await JobPost.create({
      ...job,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
