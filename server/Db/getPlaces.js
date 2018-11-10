var mongoose = require('../libs/mongoose');
var async = require('async');
// JSON we want to send to static_content_processing.js module
var PLACES;
var outsideCallback;

async.series([
    open,
    // requireModels,
    getPLACES,
], function(err, results) {
    if (err) {
        console.log("error in series");
        return
    }
    PLACES = results[1];
    // console.log(JSON.stringify(PLACES));
    // if outsideCallback is inicialized, let's pass PLACES  to it ;)
    if (typeof outsideCallback == 'function') {
        // call outsideCallback - callback from static_content_processing.js module
        outsideCallback(PLACES);
    }
    // else, let's wait until outsideCallback will be inicialized
    // I think this doing automaticly

    mongoose.disconnect();
    // event label of exiting from process 
    // process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

// show all users
// get as parametr incoming callback and execute it after completed
function getPLACES(callback) {
    var localPLACES = {};
    var Countries = require('../models/countries').Countries;
    Countries.find({}, function(err, places) {
        // const places = country.places;
        if (err) return callback(err);
        // each place
        async.forEachOf(places, function(place, key, callback) {
            const continent = place.country;
            const cities = place.places;

            const placeJSON = [];
            // save one place with all that webcams
            async.each(cities, function(item, callback) {
                // let's read one webcam
                const itemJSON = {};
                itemJSON["city"] = item.city;
                itemJSON["src"] = item.src;
                itemJSON["zip"] = item.zip;
                itemJSON["time_zone"] = item.time_zone;
                // let's push webcam data that we read to the placeJSON array
                placeJSON.push(itemJSON);
                callback();

            }, function(err) {
                if (err) return callback(err);
                // let's push placeJSON to PLACES JSON object
                // PLACES.splice(key, 0, placeJSON);
                localPLACES[continent] = placeJSON;
                // this callback for forEachOf places
                callback();
            });
        }, function(err) {
            if (err) console.error(err.message);
            // let's run next function in async.series
            callback(null, localPLACES);
        });
        // end of find method
    });
}

// returns PLACES from this module to another module
module.exports = function(cb) {
    if (typeof PLACES != 'undefined') {
        // if in first time PLACES had time to be inicialized
        // we don't wait. And call 
        // callback function from static_content_processing.js module:
        cb(PLACES);
    } else {
        // let's wait (and inicialize outsideCallback 
        // with callback function from static_content_processing.js module):
        outsideCallback = cb;
    }
};