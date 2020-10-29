import express from "express"
const router = express.Router();
import loggedIn from "../middleware/loggedIn"
import {updateProfile,getProfile} from "../controllers/profileController"

  


router.get('/:userId',loggedIn,getProfile)
router.put('/:userId',loggedIn,updateProfile)
  
module.exports = router;