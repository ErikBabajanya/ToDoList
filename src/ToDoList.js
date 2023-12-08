import React, { useState } from 'react';

function ToDoList({ toDoList, onChange, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEditStart = (index, text) => {
    setEditingIndex(index);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditedText('');
  };

  const handleEditSave = (index) => {
    onChange(index, {
      ...toDoList[index],
      text: editedText,
    });
    setEditingIndex(null);
    setEditedText('');
  };

  return (
    <div className='List'>
      {toDoList.map((list, index) => (
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
          {editingIndex === index ? (
            <div>
              <input
                className='Change-task'
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button className='change' onClick={() => handleEditSave(index)}>Save</button>
              <button className='change' onClick={handleEditCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <span onClick={() => handleEditStart(index, list.text)}>{list.text}</span>
              <span className={list.completed ? "online" : "offline"} />
              <button onClick={() => onDelete(list.id)}>X</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
