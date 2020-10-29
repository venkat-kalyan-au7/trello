import express from "express"
const router = express.Router()
import loggedIn from "../middleware/loggedIn"

import {check,validationResult} from "express-validator"

import {newList,allBoard,getStatusList} from "../controllers/statusController"


router.post('/',[loggedIn,  [check('title', 'Title is required').not().isEmpty()]],newList)

router.get('/boardLists/:boardId',loggedIn,allBoard)

router.get('/:id',loggedIn,getStatusList)




module.exports = router