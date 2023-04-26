require('../../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { restoreUser, requireUser, loginUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

// GET all users
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

// 
router.get('/current', restoreUser, (req, res) => {
	if (!isProduction) {
		const csrfToken = req.csrfToken();
		res.cookie('CSRF-Token', csrfToken);
	}
	if (!req.user) return res.json(null);
	res.json({
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
		firstName: req.user.firstName,
		lastName: req.user.lastName
	})
})

// POST /api/users/register (creating a user profile)
router.post('/register', validateRegisterInput, async(req, res) => {
  // Check to see username or email is NOT duplicate

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
  if (user) {
	const err = new Error('Validation Error');
	err.statusCode = 400;
	const errors = {};
	if (user.email === req.body.email) {
		errors.email = 'Email is invalid or already taken.';
	}
	if (user.username == req.body.username) {
		errors.username = 'Username is invalid or already taken.';
	}
	err.errors = errors;
	return next(err);
  }
  
  // If passed conditions, create new user

  const newUser = new User({
	username: req.body.username,
	email: req.body.email,
	firstName: req.body.firstName,
	lastName: req.body.lastName
  })

  bcrypt.genSalt(10, (err, salt) => {
	if (err) throw err;
	bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
		if (err) throw err;
		try {
			newUser.hashedPassword = hashedPassword;
			const user = await newUser.save();
			return res.json(await loginUser(user));
		}
		catch(err) {
			next(err);
		}
	})
  })
})

// POST /api/users/login (logging in a user)
router.post('/login', validateLoginInput, async (req, res, next) => {
	passport.authenticate('local', async function(err, user) {
		if (err) return next(err);
		if (!user) {
			const err = new Error('Invalid Credentials!');
			err.status = 400;
			err.errors = { email: 'Invalid Credentials!'};
			return next(err);
		}
		return res.json(await loginUser(user));
	}) (req, res, next);
})


module.exports = router;
