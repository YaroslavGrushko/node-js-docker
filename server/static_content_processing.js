var log = require('./libs/log')(module);
// module for processing requests/response to(from) static content {located on the server}  with correct meta-data.
// means that this module takes request, response from app.js and returns response with static content
const customers = [
    { id: 1, firstName: 'Yaroslav', lastName: 'Grushko' },
    { id: 2, firstName: 'Denis', lastName: 'Garkavenko' },
    { id: 3, firstName: 'Vasiliy', lastName: 'Pupko' },
];
//webcames array with city name and src to youtube live
// const PLACEStoCreate = {};
// PLACEStoCreate["Европа"] = [
//     // { city: "Saint-Malo-Le Port", src: "https://www.youtube.com/embed/fQ8pFCrVGzE", zip: "Saint-Malo", time_zone: "Europe/Berlin" },
//     { city: "Kyev", src: "https://www.youtube.com/embed/fQ8pFCrVGzE", zip: "Saint-Malo", time_zone: "Europe/Berlin" },
//     { city: "Baden-Baden", src: "https://www.youtube.com/embed/KiKuzd-ioRw", zip: "Baden-Baden", time_zone: "Europe/Berlin" },
//     //{city:"Venice", src:"https://www.youtube.com/embed/YiiNSrDuECw", zip: "Venezia", time_zone:"Europe/Madrid"}
//     { city: "Venice", src: "https://www.youtube.com/embed/vPbQcM4k1Ys", zip: "Moscow", time_zone: "Europe/Madrid" },
//     { city: "Oslo", src: "https://www.youtube.com/embed/DhPYnvZmFQA", zip: "Oslo", time_zone: "Europe/Madrid" }
// ];
// PLACEStoCreate["Азия"] = [
//     { city: "Koh Samui", src: "https://www.youtube.com/embed/y5hjoAZGf_E", zip: "Ko Samui", time_zone: "Asia/Saigon" },
//     { city: "Tokyo", src: "https://www.youtube.com/embed/JYBpu1OyP0c", zip: "Tokyo", time_zone: "Asia/Tokyo" },
//     { city: "Tokyo", src: "https://www.youtube.com/embed/nKMuBisZsZI", zip: "Tokyo", time_zone: "Asia/Tokyo" },
//     { city: "Earth", src: "https://www.youtube.com/embed/qyEzsAy4qeU", zip: "Kiev", time_zone: "Europe/Kiev" }
// ];
// PLACEStoCreate["Америка"] = [
//     { city: "New York", src: "https://www.youtube.com/embed/la90mA4VLa4", zip: "New York", time_zone: "America/New_York" },
//     { city: "Banff", src: "https://www.youtube.com/embed/2UX83tXoZoU", zip: "Banff", time_zone: "Canada/Central" },
//     { city: "Tucson", src: "https://www.youtube.com/embed/nmoQp7gyzIk", zip: "Tucson", time_zone: "America/Fort_Nelson" },
//     { city: "Mexico City", src: "https://www.youtube.com/embed/jHD8XrAYAyk", zip: "Mexico City", time_zone: "America/Mexico_City" }
// ];
// PLACEStoCreate["Африка"] = [
//     { city: "Cape Town", src: "https://www.youtube.com/embed/Ki-d5f5_WwU", zip: "Cape Town", time_zone: "Africa/Cairo" },
//     { city: "Melbourne", src: "https://www.youtube.com/embed/FZ72I6o6Z9k", zip: "Melbourne", time_zone: "Australia/Melbourne" },
//     { city: "Animals", src: "https://www.youtube.com/embed/TW19E-C8nJ8", zip: "Cape Town", zip: "Cape Town" },
//     { city: "Animals", src: "https://www.youtube.com/embed/Kay9czw22ew", zip: "Cape Town", zip: "Cape Town" }
// ];

function StaticContent(current_request, current_response) {

    this.request = current_request;
    this.response = current_response;
    //get headers of request:
    var host = this.request.headers['host'];
    // request headers validation
    // host must be defined and defined as 'localhost:5000'
    if (host && host == 'localhost:5000') log.info('++ host from request headers is validated successfully, host: ' + host);
    // let's imagine that we need Chroom browser,
    //so user agent must be defined and be Chroom browser
    var userAgent = this.request.headers['user-agent'];
    if (userAgent && userAgent.includes('Chrome')) log.info('++ user agent from request headers is validated successfully, user agent: ' + userAgent);


    var staticContent = " ";
    this.getStaticContent = function(type) {
        //return html content
        // staticContent = customers;
        // send response
        if (type == 'places') {
            // TEMPORARY>>>>> 
            //get PLACES from Db/getPlaces module
            log.info('get Data from Db/getPlaces module in async mode');
            var PLACESmod = require("./Db/getPlaces");
            PLACESmod(function(PLACES) {
                    // let's return PLACES
                    current_response.json(PLACES);
                })
                //     // <<<<<<TEMPORARY

            // current_response.json(PLACEStoCreate);

        } else {
            // let's return customers
            if (type == 'customers') {
                var a = 1;
                current_response.json(customers);
            }
        }
    }


}

module.exports = StaticContent;