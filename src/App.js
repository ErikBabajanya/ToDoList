import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import Input from "./Input";
import ToDoFooter from './ToDoFooter';

function App() {
  const initialToDoList = JSON.parse(localStorage.getItem('toDoList'));
  const [toDoList, setToDoList] = useState(initialToDoList);

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

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <div className="App">
      <div className='Cont'>
        <Input onAdd={(text, hours, minutes, seconds) => {
          setToDoList([
            ...toDoList,
            {
              id: Math.random(),
              text: text,
              completed: false,
              hours:hours,
              minutes:minutes,
              seconds:seconds,
            }
          ])
        }} />
      <ToDoList
          toDoList={toDoList}
          onDelete={handleOnDelete}
          onChange={handleOnChange}
          setDivs={setToDoList}
          setToDoList={setToDoList} 
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
