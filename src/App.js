import './App.css';
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    let updatedTodoArr = [...todos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todos', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = index => {
    let updatedTodoArr = [...todos];
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);
    localStorage.setItem('todos', JSON.stringify(updatedTodoArr));
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;

    let filteredItem = {
      ...todos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodo = (index) => {
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.splice(index, 1);
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return {...prev, title: value}
    })
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return {...prev, description: value}
    })
  }

  const handleUpdateToDo = () => {
    let updatedTodoArr = [...todos];
    updatedTodoArr[currentEdit] = currentEditedItem;
    setTodos(updatedTodoArr);
    setCurrentEdit("");
    localStorage.setItem('todos', JSON.stringify(updatedTodoArr));
  }

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todos'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);


  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>

        <div className='todo-input'>

          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?" />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?" />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo}
              className='primaryBtn'>Add Todo</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen === false && todos.map((item, index) => {
            if (currentEdit === index) {
              return (<div className='edit_wrapper' key={index}>
                <input placeholder='Update Title'
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem.title} />
                <input placeholder='Update Description'
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  value={currentEditedItem.description} />
                <button type='button' onClick={handleUpdateToDo}
                  className='primaryBtn'>Update</button>
              </div>
              )
            } else {
              return (
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <MdDelete onClick={handleDeleteTodo} className='icon' title='Delete?' />
                    <FaCheck className='check-icon' onClick={() => handleComplete(index)} title='Completed?' />
                    <AiOutlineEdit className="check-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
                  </div>
                </div>
              )
            }
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><smalll>completed on:  {item.completedOn}</smalll></p>
                </div>

                <div>
                  <MdDelete onClick={handleDeleteCompletedTodo} className='icon' title='Delete?' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
