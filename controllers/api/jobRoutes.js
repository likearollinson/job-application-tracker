const router = require('express').Router();
const { JobPost } = require('../../models');

router.post('/', async (req, res) => {
  try {
    if (req.body.company_name && req.body.title && req.body.location) {
      const body = req.body;
      body.user_id = req.session.user_id;

      const newJob = await JobPost.create(body);
      
      res.status(200).json(newJob);
    } else {
      res.status(400).json({ message: 'Bad request.' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const jobData = await JobPost.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });

    if (!jobData) {
      res.status(404).json({ message: 'No job found with this id!' });
      return;
    }

    res.status(200).json(jobData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (req.body.company_name && req.body.title && req.body.location) {
      const jobData = await JobPost.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json(jobData);
    } else {
      res.status(400).json({ message: 'Bad request.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
