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
router.get('/jobPost/:id', withAuth, async (req, res) => {
  try {
    const jobData = await JobPost.findByPk(req.params.id)

    const job = jobData.get({ plain: true });

    res.render('job', job);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
