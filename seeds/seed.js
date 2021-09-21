const sequelize = require('../config/connection');
const { User, JobPost, Events } = require('../models');

const userData = require('./userData.json');
const jobData = require('./jobData.json');
const eventsData = require('./eventsData.json');

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

  for (const event of eventsData) {
    await Events.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
