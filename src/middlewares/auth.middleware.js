const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    if(req.headers && req.headers.authorization  && req.headers.authorization.split(' ')[0] === 'Bearer'){
		var jwtToken =  req.headers.authorization.split(' ')[1];
		try {
			var verify = jwt.verify( jwtToken, process.env.SECRET_KEY)
			req.user = verify;
			
            next();
		} catch (e) {
			res.status(401).json({ message: 'Unauthorized' });
		}
    } else {
        res.status(401).json({ message: 'Unauthorized' });
	}
};

