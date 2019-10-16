const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');
const Users = require('../users/users-model');


// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(error => {
          res.status(500).json(error);
      });
});

  router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //generate JWT w/user id as payload sub
                const token = generateToken(user);
                //return JWT to browser
                res.status(200).json({ 
                  message: `Welcome ${user.username}!`,
                  token });
            } else {
                res.status(401).json({ message: 'You shall not pass!' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'There was a problem logging user in' });
        });
});

  function generateToken(user) {
    const payload = {
      username: user.username,
      subject: user.id
    }
    // const secret = 'is it a secret?';
    const options = {
      expiresIn: '2d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
  }
  
module.exports = router;