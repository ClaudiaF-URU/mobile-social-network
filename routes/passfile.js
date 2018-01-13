var multer		= require('multer');
var fs			= require('fs');
var util  		= require('./util/utils');
var datef		= require('dateformat');
var pg			= require('pg');
// var conString	= "postgres://postgres:masterkey@localhost:5432/socialNetwork";
var conString = "postgres://mvaodoqxwjxzvl:5645ee52b2e218001955276a012275d8f74c0afe1a330f3c1297e7bcf31356d1@ec2-23-23-243-111.compute-1.amazonaws.com:5432/d374l210cfo6bu";


module.exports = function (req, res){
	
	
	

	var date = new Date();
	console.log(req.file);
	/*"C:/Users/Jose Alejandro/Moviles/Server/temp/"*/ 
	 var tmp_picture = "temp/"+req.file.filename;
	console.log('temp:'+tmp_picture);
	// "C:/Users/Jose Alejandro/Moviles/Server/users/"			res.file.mimetype
	var filename=datef(date,"dd,mm,yyyy,h_MM_ss")+req.file.filename+util.getExt(req.file.mimetype);
    var user_picture = "users/"+req.body.username+'/'+filename;
    console.log('file:'+user_picture);

    var info = {
			"user": req.body.username,
			"title": req.body.title,
			"filename":filename,
			"url": "users/"+req.body.username,
			"type": req.file.mimetype,
			"location": req.body.geolocation,
			"tags": req.body.tag,
			"date": datef(date,"dd,mm,yyyy,h:MM:ss")
		};

	fs.rename(tmp_picture, user_picture, function (err) {
		if(err){
			console.log('shame');
			return err;
		}
		var client = new pg.Client(conString);
		client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}
			client.query('INSERT INTO publish'+
					'(publish_user,publish_title,publish_filename,publish_url,publish_type,publish_location,publish_tags,publish_date)'+
					' values ($1,$2,$3,$4,$5,$6,$7,$8)',[info.user,info.title,info.filename,info.url,info.type,info.location,info.tags,info.date], 
			function(err, result) {
				if(err) {
					res.send({
						"status":400,
						"response":"couldn't add to DB"
					});
				return 
				}
				res.send({
					"status": 200,
					"response":"file uploaded",
				}); 
			});
		});	
  	});
}