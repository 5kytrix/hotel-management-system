const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const keys = require('../keys');
const UserModel = require('../models/user');

router.get('/:id', async function(req, res, next){
  const { id } = req.params;
  const user = await UserModel.findById(mongoose.Types.ObjectId(id)).exec();
  res.json(user);
})

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  const user = await UserModel.find({email: email}).exec();
  if (user.length === 0) return res.status(400).send('Email not registered');
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (isMatch) {
    const payload = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
    };
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 604800
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  } else {
    return res
          .status(401)
          .send("Password incorrect");
  }
});


router.post('/', async function(req, res, next) {
  const user = new UserModel(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(user => res.json(user))
        .catch(err => {
          switch(err.code) {
            case 11000:
              res.status(400).send('Account exists');
              break;
            default:
              res.status(500).send(err);
          }
        });
    });
  });
});

router.put('/', async function(req, res, next) {
  const { name, email } = req.body;
  try {
    await UserModel.updateOne({ email: email }, { name: name }).exec();
    res.send('Success');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
