import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import '../styles/App.css';

const todoList = ({
  todos,
  handleDeleteTodo,
  handleComplete,
  handleEdit,
  currentEdit,
  currentEditedItem,
  handleUpdateToDo,
  handleUpdateTitle,
  handleUpdateDescription,
}) => (
  <div className='todo-list'>
    {todos.map((item, index) => (
      currentEdit === index ? (
        <div className='edit_wrapper' key={index}>
          <input
            placeholder='Update Title'
            onChange={(e) => handleUpdateTitle(e.target.value)}
            value={currentEditedItem.title}
          />
          <input
            placeholder='Update Description'
            onChange={(e) => handleUpdateDescription(e.target.value)}
            value={currentEditedItem.description}
          />
          <button type='button' onClick={handleUpdateToDo} className='primaryBtn'>Update</button>
        </div>
      ) : (
        <div className='todo-list-item' key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <div>
            <MdDelete onClick={() => handleDeleteTodo(index)} className='icon' title='Delete?' />
            <FaCheck className='check-icon' onClick={() => handleComplete(index)} title='Completed?' />
            <AiOutlineEdit className="check-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
          </div>
        </div>
      )
    ))}
  </div>
);

export default todoList;
