var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createPLACES,
    getPLACES,
], function(err, results) {
    if (err) {
        console.log("error in series");
        return
    }
    // console.log(arguments);
    console.log(JSON.stringify(results[4]));

    mongoose.disconnect();
    // event label of exiting from process 
    // process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
// requireModels check if index is created for each model from mongoose.models
// if yes perform callback and go to createUsers function; if not let's wait just a little
function requireModels(callback) {
    // we create new User model in this part of code to perform ensureIndex() function
    //  after Db was dropped (on the previous step by function dropDatabase())
    require('./models/user');
    require('./models/place');
    require('./models/countries');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

// function createUsers(callback) {

//     var users = [
//         { username: 'Vasya', password: 'supervasya' },
//         { username: 'Petya', password: '123' },
//         { username: 'admin', password: 'thetruehero' }
//     ];

//     async.each(users, function(userData, callback) {
//         var user = new mongoose.models.User(userData);
//         user.save(callback);
//     }, callback);
// }
// create PLACES in MongoDb
function createPLACES(callback) {
    //webcames array with city name and src to youtube live
    const PLACEStoCreate = {};
    PLACEStoCreate["Европа"] = [
        { city: "Saint-Malo-Le Port", src: "https://www.youtube.com/embed/fQ8pFCrVGzE", zip: "Saint-Malo", time_zone: "Europe/Berlin" },
        { city: "Baden-Baden", src: "https://www.youtube.com/embed/KiKuzd-ioRw", zip: "Baden-Baden", time_zone: "Europe/Berlin" },
        //{city:"Venice", src:"https://www.youtube.com/embed/YiiNSrDuECw", zip: "Venezia", time_zone:"Europe/Madrid"}
        { city: "Venice", src: "https://www.youtube.com/embed/vPbQcM4k1Ys", zip: "Moscow", time_zone: "Europe/Madrid" },
        { city: "Oslo", src: "https://www.youtube.com/embed/DhPYnvZmFQA", zip: "Oslo", time_zone: "Europe/Madrid" }
    ];
    PLACEStoCreate["Азия"] = [
        { city: "Koh Samui", src: "https://www.youtube.com/embed/y5hjoAZGf_E", zip: "Ko Samui", time_zone: "Asia/Saigon" },
        { city: "Tokyo", src: "https://www.youtube.com/embed/JYBpu1OyP0c", zip: "Tokyo", time_zone: "Asia/Tokyo" },
        { city: "Tokyo", src: "https://www.youtube.com/embed/nKMuBisZsZI", zip: "Tokyo", time_zone: "Asia/Tokyo" },
        { city: "Earth", src: "https://www.youtube.com/embed/qyEzsAy4qeU", zip: "Kiev", time_zone: "Europe/Kiev" }
    ];
    PLACEStoCreate["Америка"] = [
        { city: "New York", src: "https://www.youtube.com/embed/la90mA4VLa4", zip: "New York", time_zone: "America/New_York" },
        { city: "Banff", src: "https://www.youtube.com/embed/2UX83tXoZoU", zip: "Banff", time_zone: "Canada/Central" },
        { city: "Tucson", src: "https://www.youtube.com/embed/nmoQp7gyzIk", zip: "Tucson", time_zone: "America/Fort_Nelson" },
        { city: "Mexico City", src: "https://www.youtube.com/embed/jHD8XrAYAyk", zip: "Mexico City", time_zone: "America/Mexico_City" }
    ];
    PLACEStoCreate["Африка"] = [
        { city: "Cape Town", src: "https://www.youtube.com/embed/Ki-d5f5_WwU", zip: "Cape Town", time_zone: "Africa/Cairo" },
        { city: "Melbourne", src: "https://www.youtube.com/embed/FZ72I6o6Z9k", zip: "Melbourne", time_zone: "Australia/Melbourne" },
        { city: "Animals", src: "https://www.youtube.com/embed/TW19E-C8nJ8", zip: "Cape Town", zip: "Cape Town" },
        { city: "Animals", src: "https://www.youtube.com/embed/Kay9czw22ew", zip: "Cape Town", zip: "Cape Town" }
    ];

    async.forEachOf(PLACEStoCreate, function(item, key, callback) {
        var COUNTRY = new mongoose.models.Countries({
            // paste index from PLACEStoCreate array as country
            country: key,
            // paste item of PLACEStoCreate as places 
            // (having previously converted item as an object of Place)
            places: item
        });
        // save current COUNTRY to Db
        // But I don't know why this callback in save(callback)
        COUNTRY.save(callback);
    }, function(err) {
        if (err) console.error(err.message);
        // let's run next function in async.series
        callback();
    });

}


// show all users
// get as parametr incoming callback and execute it after completed
function getPLACES(callback) {
    const PLACES = {};
    var Countries = require('./models/countries').Countries;
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
                PLACES[continent] = placeJSON;
                // this callback for forEachOf places
                callback();
            });
        }, function(err) {
            if (err) console.error(err.message);
            // let's run next function in async.series
            callback(null, PLACES);
        });
        // end of find method
    });
}
// // show all users
// function showUsers(callback) {
//     var User = require('./models/user').User;
//     User.find({}, function(err, result, callback) {
//         console.log(result);
//     });
// }