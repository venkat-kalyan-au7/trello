import express from "express"

const router = express.Router()

import loggedIn from "../middleware/loggedIn"


import {check,validationResult} from "express-validator"

import {newCard,allCards,viewCard,editCard,moveCard,deleteCard} from "../controllers/cardController"


router.post('/', [loggedIn,[check('title', 'Title is required').not().isEmpty()]],newCard)

router.get('/listCards/:listId',loggedIn,allCards)

router.get('/:id',loggedIn,viewCard)

router.patch('/edit/:id',[loggedIn],editCard)

router.patch('/move/:id',[loggedIn],moveCard)



router.delete('/:listId/:id',[loggedIn],deleteCard)





module.exports = router