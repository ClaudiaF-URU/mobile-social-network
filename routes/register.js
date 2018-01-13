
	var pg = require('pg');
	var conString = "postgres://postgres:masterkey@localhost:5432/socialNetwork";
	var md5 = require("blueimp-md5");
	var fs	= require("fs");

module.exports = function (app){

	app.get("/register", function (req, res) {
		console.log("Register GET Request received");
	});

	app.post("/register", function (req, res) {
		console.log("Register POST Request received");
		console.log(req.body);

		var toke =  md5(req.body.nick+req.body.password);
		var password = md5(req.body.password);
		
		var info = {
			name: req.body.name,
			lastname: req.body.lastname,
			email:req.body.email,
			nick: req.body.username,
			pass:password,
			token: toke
        };

        var dir = '../Server/users/'+info.nick;
        console.log(info);
		var client = new pg.Client(conString);
		client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}
				client.query('SELECT * FROM app_user where user_email=$1 OR user_nickn=$2',[info.email,info.nick], function(err, result) {
				if(err) {
				return console.error('error running query', err);
				}
				console.log(result.rows.length);
				if (result.rows == 0) {
					client.query('INSERT INTO app_user (user_name,user_lastname,user_email,user_nickn,user_pass,user_token) values ($1,$2,$3,$4,$5,$6) ',[info.name,info.lastname,info.email,info.nick,info.pass,info.token]);
					//Crear la carpeta del usuario
					
					if (!fs.existsSync(dir)){
   						 fs.mkdirSync(dir);
					}
					
					res.send({
						"status":200,
						"message":"ok",
						"info":info
					});
				} 
				else {
					res.send({
						"status":201,
						"message":"You've already signed in"
					});
					console.log(result.rows[0]);
				}
			});
		});
	});
}