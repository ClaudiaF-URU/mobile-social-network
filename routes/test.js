module.exports = function (app) {
    var path = require('path');

    app.get("/:test", function (req, res) {
        console.log('TEST GET request recieved');

        if (req.params.off === 1) {
            res.send({
                "status": 200,
                "message": "param received",
                "value": req.params.off
            });
        } else if (req.params.off === 0) {
            res.send({
                "status": 200,
                "message": "param received",
                "value": req.params.off
            });
        } else {
            res.send({
                "status": 200,
                "message": "GET received",
            });
        }
    });
}