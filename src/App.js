import React, { useState } from 'react';
import './styles/App.css';
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';
import CompletedList from './components/completedList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addTodo, deleteTodo, completeTodo } from './services/todoService';
import { paginate } from './hooks/pagination';

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

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4; // Số mục hiển thị mỗi trang   
  const totalTodoPages = Math.ceil(todos.length / itemsPerPage); // Tính toán số trang
  const currentTodos = paginate(todos, currentPage, itemsPerPage); // Lấy todos cho trang hiện tại
  // Phân trang completed todos
  const [completedPage, setCompletedPage] = useState(1);
  const totalCompletedPages = Math.ceil(completedTodos.length / itemsPerPage);
  const currentCompletedTodos = paginate(completedTodos, completedPage, itemsPerPage);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page, type) => {
    if (type === 'todos') {
      if (page >= 1 && page <= totalTodoPages) {
        setCurrentPage(page);
      }
    } else if (type === 'completed') {
      if (page >= 1 && page <= totalCompletedPages) {
        setCompletedPage(page);
      }
    }
  };

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

    // Thêm todo mới
    setIsLoading(true);
    setTimeout(() => {
    const newTodo = { title: newTitle, description: newDescription };
    setTodos(addTodo(todos, newTodo));
    setNewTitle('');
    setNewDescription('');
    setIsLoading(false);
    showNotification('Todo added successfully!');
    }, 1000);
  };

  // Hàm xử lý xóa todo
  const handleDeleteTodo = async (index) => {
    setIsLoading(true);
    setTimeout(() => {
    setTodos(deleteTodo(todos, index));
    setIsLoading(false);
    showNotification('Todo deleted successfully!');
    }, 1000);
    
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
  }, 1000);
  
  };


  // Hàm xử lý xóa completed todo
  const handleDeleteCompletedTodo = async (index) => {
    setIsLoading(true);
    setTimeout(() => {
    const updatedCompletedTodos = deleteTodo(completedTodos, index);
    setCompletedTodos(updatedCompletedTodos);
    setIsLoading(false);
    showNotification('Completed todo deleted successfully!');
    }, 1000);
    
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
    }, 1000);
    
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
        <>
        <CompletedList completedTodos={currentCompletedTodos} handleDeleteCompletedTodo={handleDeleteCompletedTodo} />
        <div className="pagination">
            <button
              onClick={() => handlePageChange(completedPage - 1, 'completed')}
              disabled={completedPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalCompletedPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1, 'completed')}
                className={completedPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(completedPage + 1, 'completed')}
              disabled={completedPage === totalCompletedPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
        <TodoList
          todos={currentTodos} // Chỉ truyền todos thuộc trang hiện tại
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

        {/*phân trang*/}
        <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalTodoPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalTodoPages}
            >
              Next
            </button>
          </div>
          </>
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
