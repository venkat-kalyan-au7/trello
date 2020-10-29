import express from "express"

const router = express.Router()
import {check,validationResult} from "express-validator"
import isLoggedIn from "../middleware/loggedIn"
import {userLogin,userAuthorized} from "../controllers/authController"

router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],userLogin)

router.get('/',isLoggedIn,userAuthorized)


module.exports= router


