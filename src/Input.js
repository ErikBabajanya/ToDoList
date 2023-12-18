import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function Input({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("")

  const onAddList = () => {
    if(text === "") return
    onAdd(text, date);
    const currentDate = new Date();
    console.log(currentDate === date);
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
        placeholder="Add Task"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <div>
        <input 
          type="datetime-local"
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
          }}  
        />
      </div>
      <IoMdAddCircleOutline className="Add" onClick={onAddList}/>
    </div>
  );
}

export default Input;
