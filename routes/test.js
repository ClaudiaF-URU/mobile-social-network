module.exports = function (app) {
    var path = require('path');

    app.get("/", function (req, res) {
        console.log('TEST GET request recieved');

        res.send({
            "status": 200,
            "message": "get received",
        });
    });

    app.get("/:test", function (req, res) {
        console.log('TEST PARAMS GET request recieved');

        if (req.params.test === 1) {
            res.send({
                "status": 200,
                "message": "param received",
                "data": req.params.test
            });
        } else {
            res.send({
                "status": 200,
                "message": "param received",
                "data": req.params.test
            });
        }

    });
}