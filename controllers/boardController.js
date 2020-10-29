import User from "../models/Usermodel"
import Board from "../models/Boardmodel"

import {check,validationResult} from "express-validator"

exports.newProject=async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title } = req.body;

    
      const newBoard = new Board({ title });
      const board = await newBoard.save();

    
      const user = await User.findById(req.user.id);
      user.boards.unshift(board.id);
      await user.save();

     
      board.members.push({ user: user.id, name: user.name });


      
       await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }


exports.myBoards=async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      const boards = [];
      for (const boardId of user.boards) {
        boards.push(await Board.findById(boardId));
      }
  
      res.json(boards);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}

exports.boardById=async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}

   


