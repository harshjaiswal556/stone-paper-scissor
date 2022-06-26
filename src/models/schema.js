const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: String,
        required: true
    },
    player3: {
        type: String,
        required: true
    },
    player4: {
        type: String,
        required: true
    },
    player1VS: {
        p1: {
            type: String,
            required: true,
            default: "-"
        },
        p2: {
            type: Number,
            required: true
        },
        p3: {
            type: Number,
            required: true
        },
        p4: {
            type: Number,
            required: true
        },
    },

    player2VS:{
        p1: {
            type: Number,
            required: true
        },
        p2: {
            type: String,
            required: true,
            default: "-"
        },
        p3: {
            type: Number,
            required: true
        },
        p4: {
            type: Number,
            required: true
        },
    },
    player3VS:{
        p1: {
            type: Number,
            required: true
        },
        p2: {
            type: Number,
            required: true
        },
        p3: {
            type: String,
            required: true,
            default: "-"
        },
        p4: {
            type: Number,
            required: true
        },
    },
    player4VS:{
        p1: {
            type: Number,
            required: true
        },
        p2: {
            type: Number,
            required: true
        },
        p3: {
            type: Number,
            required: true
        },
        p4: {
            type: String,
            required: true,
            default: "-"
        },
    }
});

const game = new mongoose.model("Game", gameSchema);
module.exports = game;