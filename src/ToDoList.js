import {
  MdChangeCircle,
  MdDeleteForever,
  MdCheckBoxOutlineBlank,
  MdSaveAlt,
  MdCancel,
  MdHeight,
} from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";
export const baseUrl = "http://localhost:4000/api";

function ToDoList({ toDoList, onChange, onDelete, setDivs, setToDoList }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = (e, item) => {
    dragItem.current = item;
  };

  const drop = () => {
    if (!dragItem.current || !dragOverItem.current) {
      return;
    }

    const copyListItem = [...toDoList];
    const dragItemIndex = copyListItem.findIndex(
      (item) => item === dragItem.current
    );
    const dragOverIndex = copyListItem.findIndex(
      (item) => item === dragOverItem.current
    );

    if (dragItemIndex === -1 || dragOverIndex === -1) {
      return;
    }

    const [draggedItem] = copyListItem.splice(dragItemIndex, 1);
    copyListItem.splice(dragOverIndex, 0, draggedItem);
    dragItem.current = null;
    dragOverItem.current = null;
    setToDoList(copyListItem);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newDivs = [...toDoList];
      console.log(newDivs);
      const draggedItem = newDivs[draggedIndex];

      newDivs.splice(draggedIndex, 1);
      newDivs.splice(index, 0, draggedItem);

      setDivs(newDivs);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleEditStart = (index, text) => {
    setEditingIndex(index);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditedText("");
  };

  const handleEditSave = async (index, itemId) => {
    try {
      const response = await fetch(`${baseUrl}/ToDoList/editList`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          newText: editedText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit item on the server");
      }
      onChange(index, {
        ...toDoList[index],
        text: editedText,
      });
      setEditingIndex(null);
      setEditedText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="List">
      {toDoList.map(
        (list, index) =>
          !list.archive && (
            <div
              className="listDiv"
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(index);
              }}
              onDragEnd={handleDragEnd}
            >
              <MdCheckBoxOutlineBlank
                className={list.completed ? "checked" : "noCheaked"}
                onClick={() => {
                  onChange(index, {
                    ...list,
                    completed: !list.completed,
                  });
                }}
              />
              {editingIndex === index ? (
                <div className="display">
                  <input
                    className="Change-task"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="DivButton">
                    <MdSaveAlt
                      className="button"
                      onClick={() => handleEditSave(index, toDoList[index]._id)}
                    />
                    <MdCancel className="button" onClick={handleEditCancel} />
                  </div>
                </div>
              ) : (
                <div
                  className="display"
                  onDragStart={(e) => dragStart(e, list)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleDragOver(index);
                  }}
                  onDragEnd={handleDragEnd}
                >
                  <div className="ListControl">
                    <span className="left">{list.text}</span>
                    <span className="right">{list.myTime}</span>
                  </div>
                  <span className={list.completed ? "online" : "offline"} />
                  <div className="DivButton">
                    <MdChangeCircle
                      className="button"
                      onClick={() => handleEditStart(index, list.text)}
                    />
                    <MdDeleteForever
                      className="button"
                      onClick={() => onDelete(list._id)}
                    />
                  </div>
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}

export default ToDoList;
