const router = require('express').Router();
const { JobPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Render dashboard.handlebars
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all jobs
    const jobsData = await JobPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const jobs = jobsData.map((job) => job.get({ plain: true }));

    // Render dashboard.handlebars with jobs data
    res.render('dashboard', {
      jobs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render job.handlebars
router.get('/jobPost/:id', async (req, res) => {
  try {
    const jobData = await JobPost.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id,
      },
    });

    const job = jobData.get({ plain: true });
    if (req.session.logged_in) {
      res.render('job', {
        ...job,
        logged_in: req.session.logged_in,
      });
      return;
    }

    res.redirect('/login');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/calendar', withAuth, async (req, res) => {
  try {
    // Find all jobs
    const jobsData = await JobPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const jobs = jobsData.map((job) => job.get({ plain: true }));

    // If a session exists, redirect the request to the calendar
    if (req.session.logged_in) {
      res.render('calendar', {
        jobs,
        logged_in: req.session.logged_in,
      });
      return;
    }

    res.redirect('/login');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
