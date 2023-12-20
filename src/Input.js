import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
export const baseUrl = "http://localhost:4000/api";

function Input({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onAddList = async () => {
    if (text === "") return;
    let myTime = date + " " + time;
    const id = Math.random();
    const completed = false;
    const archive = false;
    if (myTime === " ") {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      myTime = myTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    const data = {
      text: text,
      myTime: myTime,
      id: id,
      completed: completed,
      archive: archive,
    };

    onAdd(data);
    setText("");

    try {
      const response = await fetch(`${baseUrl}/ToDoList/updateToDoList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
          setDate(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <input
        className="low"
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />

      <IoMdAddCircleOutline className="Add" onClick={onAddList} />
    </div>
  );
}

export default Input;
