const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Routine } = require('../models');

// @route    GET api/routines
// @desc     Get all user routines
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const routines = await Routine.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'ASC']] });
        res.json(routines);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/routines
// @desc     Add new routine
// @access   Private
router.post('/', auth, async (req, res) => {
    const { text } = req.body;

    try {
        const newRoutine = await Routine.create({
            text,
            userId: req.user.id
        });

        res.json(newRoutine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/routines/:id
// @desc     Delete a routine
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const routine = await Routine.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!routine) {
            return res.status(404).json({ msg: 'Routine not found' });
        }

        await routine.destroy();

        res.json({ msg: 'Routine removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
