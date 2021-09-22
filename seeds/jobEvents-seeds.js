const { JobEvents } = require('../models');

const jobEventsData = [
  {
    job_id: 1,
    event_id: 1,
  },
  {
    job_id: 1,
    event_id: 2,
  },
];

const seedJobEvent = () => JobEvents.bulkCreate(jobEventsData);

module.exports = seedJobEvent;
