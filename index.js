var express = require("express");
var bodyP = require("body-parser");

var register = require('./routes/register');
var login = require('./routes/login');
var info = require('./routes/info');
var info_p = require('./routes/info_publish');
var upload =  require('./routes/upload');
var likes =  require('./routes/likes');

var app = express();

app.set("port",5000);

app.use(bodyP.urlencoded({extended: false}));
app.use(bodyP.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(__dirname+"/"));
register(app);
login(app);
info(app);
upload(app);
likes(app);
info_p(app);

app.listen(app.get("port"), function () {
	console.log("NODE.Server Started... on port "+ app.get('port'));
});
