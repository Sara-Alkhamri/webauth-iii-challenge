const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
      //check that token is valid
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
          //foul play
          res.status(401).json({ message: 'Invalid Credentials' });
        } else {
          //token is good
          req.user = {username: decodedToken.username};
          next();
        }
      })
    } else {
      res.status(400).json({ message: "no credentials provided" })
    }
};    