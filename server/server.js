const express = require('express');
var config = require('./config');
var log = require('./libs/log')(module);
// var HttpError = require('./error').HttpError;
const app = express();
app.set('port', config.get('port'));
//get static contentt processing module
var StaticContent = require("./static_content_processing");
// deal with Access-Control-Allow-Origin bag on client request
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// middleware '/api/places'
app.use((req, res, next) => {
    if (req.url == '/api/places') {
        //create static content processing module
        var staticContent = new StaticContent(req, res);
        // get stat. content and perform response to front-end
        var type = 'places';
        staticContent.getStaticContent(type);
    } else {
        // let's go to next middleware
        next();
    }
});
// app.use(require('./middleware/sendHttpError'));
// require('./routes')(app);
// error handler middleware
// app.use(function(err, req, res, next) {
//     if (typeof err == 'number') { // next(404);
//         err = new HttpError(err);
//     }

//     if (err instanceof HttpError) {
//         res.sendHttpError(err);
//     } else {
//         if (app.get('env') == 'development') {
//             express.errorHandler()(err, req, res, next);
//         } else {
//             log.error(err);
//             err = new HttpError(500);
//             res.sendHttpError(err);
//         }
//     }
// });
// processing our favicon.ico
// app.use(express.favicon());

// let's log our requests
//  NOTE: express.logger('dev') is removed from express module.
// use logger like morgan.
// app.use(express.logger('dev'));

// middleware smthg else
// app.use(function(req, res) {
//     res.send(404, 'Page not found sorry')
// });
// const port = 5000;

app.listen(app.get('port'), () =>
    log.info('Server started on port ' + app.get('port'))
);