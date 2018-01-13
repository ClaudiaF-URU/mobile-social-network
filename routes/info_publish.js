module.exports = function(app) {
	var pg = require('pg');
	var conString = "postgres://postgres:masterkey@localhost:5432/socialNetwork";
	var path = require('path');

	app.get("/info_publish/:off/:token/:username", function(req, res) {
		console.log('info GET request recieved');
		var offset = req.params.off;
		var info = {
			"offset":req.params.off,
			"username":req.params.username,
			"token":req.params.token
		};
		console.log(req.params);
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if (err) {
				return console.error('could not connect to postgres', err);
			} 
			client.query('SELECT id_user FROM app_user where\
			 user_token=$1 and user_nickn=$2',[info.token,info.username],function(err2,result2) {
				if (err2) {
					return console.error('error running query out',err2);
				}

				client.query('select publish.*, (SELECT COUNT(*)\
							FROM likes WHERE likes.publish_id = publish.publish_id) as likes,\
							(SELECT COUNT(*) from publish),(SELECT COUNT(*) FROM likes WHERE \
							likes.id_user =$2 AND likes.publish_id=publish.publish_id ) as likes_user\
		 					FROM publish order by publish_id DESC LIMIT 5 OFFSET $1', [info.offset,result2.rows[0].id_user], function(err, result) {
					if (err) {
						return console.error('error running query in', err);
					}//select publish.*, COUNT(likes.publish_id) as likes from publish,likes where likes.publish_id = publish.publish_id group by publish.publish_id, likes.publish_id
							res.send({
								"status": 200,
								"endpoint": "info",
								"Method": "GET",
								"response": result.rows
							});
				});//client.queryin
			});//client.queryout
		});//client.connect
	});
}
