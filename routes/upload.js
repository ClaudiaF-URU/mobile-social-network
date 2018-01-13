module.exports = function (app) {

	var multer = require('multer');
	var passfile = require('./passfile');
	var tmp_files = multer({ dest: 'temp/' });

	app.post("/api/passfile", tmp_files.single('file'), passfile);
}