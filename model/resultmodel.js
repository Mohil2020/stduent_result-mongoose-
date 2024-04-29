var mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
    name: {
        type: String
    },
    std: {
        type: String
    },
    div: {
        type: String
    },
    roll: {
        type: String
    },
    sub1: {
        type: Number
    },
    sub2: {
        type: Number
    },
    sub3: {
        type: Number
    },
    sub4: {
        type: Number
    },
    sub5: {
        type: Number
    },
    total: {
        type: Number
    },
    min: {
        type: Number
    },
    max: {
        type: Number
    },
    per: {
        type: Number
    },
    grade: {
        type: String
    },
    result: {
        type: String
    }
})

module.exports = mongoose.model('result', resultSchema)