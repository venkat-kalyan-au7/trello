import User from "../models/Usermodel"

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check,validationResult} from "express-validator"

import keys from "../config/keys"



exports.userLogin= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

 
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

exports.userAuthorized=async(req,res)=>{

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal error');
      }

}