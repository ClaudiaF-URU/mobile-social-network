module.exports = function (app){
	var pg = require('pg');
	var conString = "postgres://postgres:masterkey@localhost:5432/socialNetwork";
	
	app.get('/info/:username/:token', function (req,res) {

		console.log("Info GET Request received");
		console.log(req.params);
		var info =  {
			username:req.params.username,
			token:req.params.token
		};

		var client = new pg.Client(conString);
			client.connect(function(err) {
					if(err) {
						return console.error('could not connect to postgres', err);
					}
					client.query('SELECT user_name,user_lastname,user_email FROM app_user where user_nickn=$1 AND user_token=$2',[info.username,info.token], function(err, result) {
					if(err) {
					return console.error('error running query', err);
					}
					console.log(result.rows.length);
					if (result.rows.length==0) {
						
						res.send({
							"status":201,
							"servlet":"info",
							"message":"Teapot Not found"
						});
					} 
					else {
						client.query('select publish.*, (SELECT COUNT(*) FROM likes WHERE likes.publish_id = publish.publish_id) as likes FROM publish where publish_user =$1 order by publish_id DESC',[info.username],function (err2,res2) {
							res.send({
								"status": 200,
								"message": "ok,GET",
								"servlet":"info",
								"info":result.rows[0],
								"pictures":res2.rows
							});
						});
						console.log(result.rows[0]);
					}
			});
		});
	});
}