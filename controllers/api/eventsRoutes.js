const router = require('express').Router();
const { Events } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const eventsData = await Events.findAll();
        res.status(200).json(eventsData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;