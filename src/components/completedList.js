import React from 'react';
import '../styles/App.css';
import { MdDelete } from "react-icons/md";

const CompletedList = ({ completedTodos, handleDeleteCompletedTodo }) => (
  <div className='todo-list'>
    {completedTodos.map((item, index) => (
      <div className='todo-list-item' key={index}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed on: {item.completedOn}</small></p>
        </div>
        <div>
          <MdDelete onClick={() => handleDeleteCompletedTodo(index)} className='icon' title='Delete?' />
        </div>
      </div>
    ))}
  </div>
);

export default CompletedList;
