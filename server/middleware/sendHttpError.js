module.exports = function(req, res, next) {

    res.sendHttpError = function(error) {

        res.status(error.status);
        // if ajax request
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
            // else (if not ajax request)
        } else {
            // this is ejx feater we need to do smth alternative with react
            res.render("error", { error: error });
        }
    };

    next();

};