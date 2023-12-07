import React, { useState } from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import Input from "./Input";
import ToDoFooter from './ToDoFooter';

function App() {
  const [toDoList, setToDoList] = useState([
    {
      id: Math.random(),
      text: "Test-1",
      completed: false
    },
    {
      id: Math.random(),
      text: "Test-2",
      completed: false
    },
    {
      id: Math.random(),
      text: "Test-3",
      completed: false
    }
  ]);

  const handleOnChange = (index, updatedItem) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList[index] = updatedItem;
    setToDoList(updatedToDoList);
  };

  const handleOnDelete = (id) => {
    setToDoList((prevToDoList) => prevToDoList.filter((item) => item.id !== id));
  };

  const handleClearCompleted = () => {
    setToDoList((prevToDoList) => prevToDoList.filter((toDo) => !toDo.completed));
  };

  return (
    <div className="App">
      <div className='Cont'>
        <Input onAdd={(text) => {
          setToDoList([
            ...toDoList,
            {
              id: Math.random(),
              text: text,
              completed: false
            }
          ])
        }} />
        <ToDoList
          toDoList={toDoList}
          onDelete={handleOnDelete}
          onChange={handleOnChange}
        />
        <ToDoFooter
          toDoList={toDoList}
          ClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  );
}

export default App;
