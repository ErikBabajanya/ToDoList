import React from 'react';

function ToDoList({ toDoList, onChange, onDelete }) {
  return (
    <div className='List'>
      {
        toDoList.map((list, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={(e) => {
                onChange(index, {
                  ...list,
                  completed: e.target.checked,
                });
              }}
              checked={list.completed}
            />
            <span>{list.text}</span>
            <button onClick={() => onDelete(list.id)}>X</button>
          </div>
        ))
      }
    </div>
  );
}

export default ToDoList;