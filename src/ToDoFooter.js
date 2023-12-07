import React from 'react';

function ToDoFooter({ toDoList, ClearCompleted }) {
  const completed = toDoList.filter((todo) => todo.completed).length;

  return (
    <div className='Footer'>
        <div>
          <span>{completed}/{toDoList.length}</span>
          <button onClick={ClearCompleted}>Clear Completed</button>
        </div>
    </div>

  );
}

export default ToDoFooter;