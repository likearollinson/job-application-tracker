const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const eventsRoutes = require('./eventsRoutes');

router.use('/users', userRoutes);
router.use('/job', jobRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
