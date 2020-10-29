import User from "../models/Usermodel"
import List from "../models/Statusmodel"
import Board from "../models/Boardmodel"

import {check,validationResult} from "express-validator"

exports.newList=  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const title = req.body.title;
      const boardId = req.header('boardId');


      const newList = new List({ title });
      const list = await newList.save();

     board
      const board = await Board.findById(boardId);
      board.lists.push(list.id);

     
      const user = await User.findById(req.user.id);
     
      await board.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }


exports.allBoard=async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const lists = [];
      for (const listId of board.lists) {
        lists.push(await List.findById(listId));
      }
  
      res.json(lists);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}

exports.getStatusList=async (req, res) => {
    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ msg: 'List not found' });
      }
  
      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}

