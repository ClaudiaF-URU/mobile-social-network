var pg = require('pg');
// var conString = "postgres://postgres:masterkey@localhost/socialNetwork";
var conString = "postgres://mvaodoqxwjxzvl:5645ee52b2e218001955276a012275d8f74c0afe1a330f3c1297e7bcf31356d1@ec2-23-23-243-111.compute-1.amazonaws.com:5432/d374l210cfo6bu";

module.exports = function (app) {

	app.get("/likes", function (req, res) {
		console.log("Likes GET Request received");
	});

	app.post("/likes", function (req, res) {
		console.log("Likes POST Request received");
		console.log(req.body);
		var info = {
			"id_publish": req.body.id,
			"user_token": req.body.token
		};

		var client = new pg.Client(conString);
		client.connect(function (err) {
			if (err) {
				return console.error('could not connect to postgres', err);
			}
			client.query('SELECT id_user FROM app_user where user_token=$1', [info.user_token], function (err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				console.log(result.rows.length);
				if (result.rows.length == 0) {
					res.send({
						"status": 400,
						"message": "Couldn't like the post :C"
					});
				} else {
					client.query('INSERT INTO likes (id_user, publish_id) SELECT $1,$2 WHERE NOT EXISTS ( SELECT id_user,publish_id FROM likes WHERE id_user =$1  AND publish_id=$2 )', [result.rows[0].id_user, info.id_publish], function (err3, res3) {
						if (err3) {
							return console.log('error inserting like');
						}
						if (res3.rowCount == 1) {

							client.query('select publish, COUNT(likes.publish_id) as likes from publish,likes where publish.publish_id = $1' +
								' AND likes.publish_id=$1 group by publish.publish_id,likes.publish_id', [info.id_publish],
								function (err2, res2) {
									if (err2) {
										return console.log('error line:41');
									}
									console.log('hue ', res2.rows)

									res.send({
										"status": 200,
										"message": "LIKED",
										"likes": res2.rows
									});
								});

						} else {
							res.send({
								"status": 202,
								"message": "ALREADY LIKED"
							});
						}
					});
				}
			});
		});
	});
}