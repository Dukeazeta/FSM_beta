const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['hostelcup', 'nasscup', 'superleague', 'tribalcup', 'vccup']
    },
    date: {
        type: Date,
        required: true
    },
    teams: [{
        name: String,
        points: Number
    }],
    matches: [{
        team1: String,
        team2: String,
        score1: Number,
        score2: Number,
        date: Date
    }]
});

module.exports = mongoose.model('Tournament', TournamentSchema);
