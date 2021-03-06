const express = require('express');
const router = express.Router();
const _ = require('lodash');
const url = require('url');

const User = require('../models/user');
const { sendEmail } = require('../utils/sendEmail');
const { authenticate } = require('../middleware/authenticate');

// POST /users
router.post('/', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const newUser = new User(body);
    await newUser.save();
    const token = await newUser.generateAuthToken('auth');
    res.header('x-auth', token).send(newUser);
  } catch (err) {
    res.status(400).send('err');
  }
});

// GET /users/me
router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login
router.post('/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken('auth');
    res
      .header('x-auth', token)
      .status(200)
      .json({ _id: user._id, email: user.email });
  } catch (e) {
    res.status(400).send();
  }
});

// DELETE /users/logout
router.delete('/logout', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

// POST /users/verify-email
router.post('/verify-email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send();
    }
    const token = await user.generateAuthToken('email-confirmation');

    // Setting email
    const mailOptions = {
      from: 'Air Technik INC. <airtnik@gmail.com>',
      to: user.email,
      subject: 'Password reset instructions',
      text:
        'Hello.\nPlease, to reset your password follow the next link:' +
        '\n\nhttps://fast-shore-26090.herokuapp.com/users/recovery-password/' +
        token +
        '.\n\n' +
        'Please note that this confirmation link expires soon and may require your immediate attention if you wish to access your online account in the future.\n\n' +
        'PLEASE DO NOT REPLY TO THIS MESSAGE.'
    };
    if (await createEmail(mailOptions)) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(400).send();
  }
});

async function createEmail(mailOptions) {
  try {
    let sent = await sendEmail(mailOptions);
    return sent ? 1 : 0;
  } catch (e) {
    return 0;
  }
}

// GET /users/recovery-password
router.get('/recovery-password/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findByToken(token);
    const resetPassToken = await user.generateAuthToken('reset-password');
    await user.removeToken(token);
    res.redirect(
      decodeURIComponent(
        url.format({
          protocol: 'https:',
          host: 'fast-shore-26090.herokuapp.com',
          pathname: '/#/change-password',
          query: {
            token: resetPassToken
          }
        })
      )
    );
  } catch (e) {
    res.status(400).send(e);
  }
});

// PATH /change-password
router.patch('/change-password', authenticate, async (req, res) => {
  try {
    req.user.password = req.body.password;
    await req.user.save();
    await req.user.removeToken(req.body.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/send-email', async (req, res) => {
  try {
    let mailOptions = {
      from: 'Air Technik INC. <airtnik@gmail.com>',
      to: 'airtnik@gmail.com',
      subject: 'Email sent from airtechnik.com',
      text:
        'From: ' +
        req.body.email +
        '\nMy name is: ' +
        req.body.name +
        '\n\n' +
        req.body.message
    };
    if (await createEmail(mailOptions)) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
