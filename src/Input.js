import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function Input({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onAddList = () => {
    const currentDate = new Date();
    let myTime = date + " " + time;
    if(text === "") return
    onAdd(text, myTime);
    setText("");
  };

  const handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
      onAddList();
    }
  };

  return (
    <div className="Header">
      <input 
        className="width"
        placeholder="Add Task"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
        <input 
          className="low"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
          }}  
          onKeyPress={handleKeyPress}
        />
         <input 
          className="low"
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value)
          }}  
          onKeyPress={handleKeyPress}
        />
      
      <IoMdAddCircleOutline className="Add" onClick={onAddList}/>
    </div>
  );
}

export default Input;
