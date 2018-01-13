module.exports = function (app){
	var pg = require('pg');
	var md5 = require("blueimp-md5");
	var conString = "postgres://postgres:masterkey@localhost/socialNetwork";
	
	app.get("/login", function (req, res){
		console.log("Login GET Request received");

		res.send({
			"status": 200,
			"message": "ok,GET",
			"servlet":"login"
		});
	});

	app.post("/login", function (req, res){
		console.log("Login POST Request received");


		console.log(req.body);
		var password = md5(req.body.password);
		var info = {
			nick: req.body.username,
			pass: password,
        };

        var client = new pg.Client(conString);
			client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}
				client.query('SELECT user_nickn,user_token FROM app_user where user_nickn=$1 AND user_pass=$2',[info.nick,info.pass], function(err, result) {
				if(err) {
				return console.error('error running query', err);
				}
				console.log(result.rows.length);
				if (result.rows==0) {
					
					res.send({
						"status":201,
						"message":"Wrong combination of username or password"
					});
				} 
				else {
					res.send({
						"status": 200,
						"message": "ok,POST",
						"servlet":"login",
						"info":result.rows[0]
					});
				}
			});
		}); 
	});
}