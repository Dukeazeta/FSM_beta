const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Get all tournaments 
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get tournament by type
router.get('/:type', async (req, res) => {
    try {
        const tournament = await Tournament.find({ type: req.params.type });
        res.json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create tournament
router.post('/', async (req, res) => {
    const tournament = new Tournament({
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        teams: req.body.teams,
        matches: req.body.matches
    });

    try {
        const newTournament = await tournament.save();
        res.status(201).json(newTournament);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
