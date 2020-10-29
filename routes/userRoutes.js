import express from "express"

const router = express.Router()
import {check,validationResult} from "express-validator"
import isLoggedIn from "../middleware/loggedIn"
import {userRegister,getUsers} from "../controllers/userController"

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],userRegister
  
  )

router.get('/:input',isLoggedIn,getUsers)

module.exports = router