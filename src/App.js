import React, { useState, useEffect } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import Input from "./Input";
import ToDoFooter from "./ToDoFooter";
import Archive from "./Archive";
export const baseUrl = "http://localhost:4000/api";

function App() {
  // const initialToDoList = JSON.parse(localStorage.getItem("toDoList"));
  // const defaultToDoList = [
  //   { text: "text1", completed: false, id: Math.random() },
  // ];
  const [toDoList, setToDoList] = useState([]);

  const [currentTab, setCurrentTab] = useState("Active");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleOnChange = (index, updatedItem) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList[index] = updatedItem;
    setToDoList(updatedToDoList);
  };

  const handleOnDelete = async (_id) => {
    console.log(_id);
    console.log(toDoList);
    try {
      const response = await fetch(`${baseUrl}/ToDoList/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      if (response.ok) {
        setToDoList((prevToDoList) =>
          prevToDoList.filter((item) => item._id !== _id)
        );
      } else {
        console.error("Error deleting item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setToDoList((prevToDoList) =>
      prevToDoList.filter((item) => item._id !== _id)
    );
  };

  const handleClearCompleted = async () => {
    const completedIds = toDoList
      .filter((toDo) => toDo.completed)
      .map((completedToDo) => completedToDo._id);

    // Update state to remove completed items
    setToDoList((prevToDoList) =>
      prevToDoList.filter((toDo) => !toDo.completed)
    );

    try {
      const response = await fetch(`${baseUrl}/ToDoList/clearCompleted`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to clear completed items on the server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/ToDoList`);
        const data = await response.json();
        setToDoList(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="ButtonControl">
        <button onClick={() => handleTabClick("Active")} className="Butt">
          Active
        </button>
        <button onClick={() => handleTabClick("archive")} className="Butt">
          Archive
        </button>
      </div>
      <div className="Cont">
        {currentTab === "Active" ? (
          <>
            <Input
              onAdd={(data) => {
                setToDoList([...toDoList, data]);
              }}
            />
            <ToDoList
              toDoList={toDoList.filter((item) => !item.archive)}
              onDelete={handleOnDelete}
              onChange={handleOnChange}
              setDivs={setToDoList}
              setToDoList={setToDoList}
            />
            <ToDoFooter
              toDoList={toDoList.filter((item) => !item.archive)}
              ClearCompleted={handleClearCompleted}
            />
          </>
        ) : currentTab === "archive" ? (
          <Archive
            toDoList={toDoList.filter((item) => item.archive)}
            onDelete={handleOnDelete}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
