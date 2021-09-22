const router = require('express').Router();
const { Events } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const eventsData = await Events.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(eventsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/job/:id', async (req, res) => {
  try {
    const eventsData = await Events.findAll({
      where: {
        user_id: req.session.user_id,
        job_id: req.params.id,
      },
    });

    res.status(200).json(eventsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.start && req.body.end && req.body.title) {
      const body = req.body;
      body.user_id = req.session.user_id;
      const newEvent = await Events.create(body);

      res.status(200).json(newEvent);
    } else {
      res.status(400).json({ message: 'Bad request.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
