import React from "react";
import { MdClear } from "react-icons/md";

function ToDoFooter({ toDoList, ClearCompleted }) {
  const completed = toDoList.filter((todo) => todo.completed).length;

  return (
    <div className="Footer">
      <div>
        <span>
          {completed}/{toDoList.length}
        </span>
        <MdClear onClick={ClearCompleted} className="clear" />
      </div>
    </div>
  );
}

export default ToDoFooter;
