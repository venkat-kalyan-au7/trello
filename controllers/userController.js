import User from "../models/Usermodel"

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check,validationResult} from "express-validator"
import gravatar from "gravatar"

import keys from "../config/keys"

exports.userRegister= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
     
      if (await User.findOne({ email })) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

  
      const user = new User({
        name,
        email,
        avatar: gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      });

      await user.save();

   
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        keys.secretKey,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

exports.getUsers=async (req, res) => {
  try {
    const regex = new RegExp(req.params.input, 'i');
    const users = await User.find({
      email: regex,
    }).select('-password');

    res.json(users.filter((user) => user.id !== req.user.id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }}

  