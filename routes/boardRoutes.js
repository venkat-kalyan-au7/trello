import express from "express"
const router = express.Router()

import loggedIn from "../middleware/loggedIn"


import {check,validationResult} from "express-validator"

import {newProject,myBoards,boardById} from "../controllers/boardController"

router.post('/', [loggedIn, [check('title', 'Title is required').not().isEmpty()]],newProject)

router.get('/',loggedIn,myBoards)

router.get('/:id',loggedIn,boardById)



module.exports=router