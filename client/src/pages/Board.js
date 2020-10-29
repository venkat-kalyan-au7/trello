import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveCard } from '../Redux/actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../components/TrelloBoard/BoardTitle';

import List from '../components/StatusList/List';
import CreateList from '../components/TrelloBoard/CreateList';

import Navbar from '../components/Common/Navbar';

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } 
  };

  return !board ? (
    <Fragment>
      <Navbar />
      
      <Box className='board-loading'>
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div className='board-and-navbar'>
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
          
          </div>
         
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {(provided) => (
              <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                {provided.placeholder}
              
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      <h4>NOTE :- ADD ONLY TODO,PROGRESS,COMPLETED TABS ONLY AND IT'S CASE SENSITIVE ,OTHER THAN THESE 3 ARE NOT ACCEPTED</h4>
    </div>
  );
};

export default Board;
