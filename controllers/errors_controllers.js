exports.handler_404 = (err, req, res, next) => {
	res.sendStatus(err.status);
};

exports.handler_mongoose_errors = (err, req, res, next) => {
	res.sendStatus(err.status);
};

//error handlers always need (err, req, res, next) to identify as error handling functions, otherwise it may fail to handle errors.
