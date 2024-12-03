import React, { useState } from 'react';
import './styles/App.css';
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';
import CompletedList from './components/completedList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addTodo, deleteTodo, completeTodo } from './services/todoService';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [completedTodos, setCompletedTodos] = useLocalStorage('completedTodos', []);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // Hàm hiển thị thông báo và ẩn tự động sau 2 giây
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };


  // Hàm xử lý thêm todo
  const handleAddTodo = async () => {
     // Kiểm tra nếu title rỗng thì hiển thị lỗi
    if (!newTitle.trim()) {
      setTitleError('Title is required.');
      console.log('Title Error:', titleError);
      return;
    } else {
      setTitleError('');
    }
     // Kiểm tra nếu description rỗng thì hiển thị lỗi
    if (!newDescription.trim()) {
      setDescriptionError('Description is required.');
      console.log('Description Error:', descriptionError);
      return;
    } else {
      setDescriptionError('');
    }

    setIsLoading(true);
    setTimeout(() => {
    const newTodo = { title: newTitle, description: newDescription };
    setTodos(addTodo(todos, newTodo));
    setNewTitle('');
    setNewDescription('');
    setIsLoading(false);
    showNotification('Todo added successfully!');
    }, 2000);
  };

  const handleDeleteTodo = async (index) => {
    setIsLoading(true);
    setTimeout(() => {
    setTodos(deleteTodo(todos, index));
    setIsLoading(false);
    showNotification('Todo deleted successfully!');
    }, 2000);
    
  };


  // Hàm xử lý hoàn thành todo
  const handleComplete = async (index) => {
    setIsLoading(true);
    setTimeout(() => {
    const { updatedTodos, updatedCompletedTodos } = completeTodo(todos, index, completedTodos);
    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);
    setIsLoading(false);
    showNotification('Todo marked as completed!');
  }, 2000);
  
  };


  // Hàm xử lý xóa completed todo
  const handleDeleteCompletedTodo = async (index) => {
    setIsLoading(true);
    setTimeout(() => {
    const updatedCompletedTodos = deleteTodo(completedTodos, index);
    setCompletedTodos(updatedCompletedTodos);
    setIsLoading(false);
    showNotification('Completed todo deleted successfully!');
    }, 2000);
    
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      description: value,
    }));
  };

  // Hàm xử lý cập nhật todo
  const handleUpdateToDo = async () => {
    setIsLoading(true);
    setTimeout(() => {
    const updatedTodos = [...todos];
    updatedTodos[currentEdit] = currentEditedItem;
    setTodos(updatedTodos);
    setCurrentEdit(null);
    setCurrentEditedItem(null);
    setIsLoading(false);
    showNotification('Todo updated successfully!');
    }, 2000);
    
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <TodoForm
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        handleAddTodo={handleAddTodo}
        titleError={titleError}
        descriptionError={descriptionError}
        isLoading={isLoading.addTodo} // Truyền trạng thái loading cho form
      />
      <div className='btn-area'>
        <button onClick={() => setIsCompleteScreen(false)} className={!isCompleteScreen ? 'active' : ''}>Todo</button>
        <button onClick={() => setIsCompleteScreen(true)} className={isCompleteScreen ? 'active' : ''}>Completed</button>
      </div>
      {isCompleteScreen ? (
        <CompletedList completedTodos={completedTodos} handleDeleteCompletedTodo={handleDeleteCompletedTodo} />
      ) : (
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
          handleEdit={handleEdit}
          currentEdit={currentEdit}
          setCurrentEdit={setCurrentEdit}
          currentEditedItem={currentEditedItem}
          setCurrentEditedItem={setCurrentEditedItem}
          handleUpdateToDo={handleUpdateToDo}
          handleUpdateTitle={handleUpdateTitle}
          handleUpdateDescription={handleUpdateDescription}
          isLoading={isLoading} // Truyền trạng thái loading cho từng hành động
        />
      )}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      )}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
