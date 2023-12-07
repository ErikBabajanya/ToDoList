import React, { useState } from "react";

function Input({ onAdd }) {
  const [text, setText] = useState("");

  const onAddList = () => {
    onAdd(text);
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
      <button onClick={onAddList}>AddList</button>
    </div>
  );
}

export default Input;
