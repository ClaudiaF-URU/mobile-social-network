module.exports = function (app) {
    var path = require('path');

    app.get("/", function (req, res) {
        console.log('TEST GET request recieved');

        res.send({
            "status": 200,
            "message": "get received",
        });
    });
}