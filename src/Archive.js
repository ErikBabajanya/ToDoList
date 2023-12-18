import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import "./App.css"

function Archive({ toDoList, onDelete }) {
    const [newList, setNewList] = useState([]);
    console.log(toDoList);

    return (
        toDoList.map((list) => (
            <div key={list.id} className="List ArchivList">
                <div className="display">
                    <div className="ListControl">
                        <span>{list.text}</span>
                        <span>{list.myTime}</span>
                    </div>
                    <div className="DivButton">
                        <MdDeleteForever className='button' onClick={() => onDelete(list.id)} />
                    </div>
                </div>
                
            </div>
        ))
    );
}

export default Archive;
