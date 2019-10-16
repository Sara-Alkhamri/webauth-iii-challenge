const router = require('express').Router();

//import middleware
const restricted = require('../auth/restricted-middleware');
const Users = require('./users-model');

router.get('/', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json({users, loggedInUser: req.user.username});
      })
      .catch(err => res.send(err));
  });
  
  module.exports = router;
  