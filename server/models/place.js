// var crypto = require('crypto');
var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
// Schema = mongoose.Schema; { city: "New York", src: "https://www.youtube.com/embed/la90mA4VLa4", zip: "New York", time_zone: "America/New_York" },

var schema = new Schema({
    city: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    zip: {
        type: String,
    },
    time_zone: {
        type: String,
    },
});

exports.Place = mongoose.model('Place', schema);