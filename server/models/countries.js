var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    country: String,
    places: [{
        city: String,
        src: String,
        zip: String,
        time_zone: String
    }]
});

exports.Countries = mongoose.model('Countries', schema);