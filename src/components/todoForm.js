import React from 'react';
import '../styles/App.css';

const todoForm = ({ newTitle, setNewTitle, newDescription, setNewDescription, handleAddTodo, titleError,
    descriptionError, isLoading}) => {
    return (
        <div className='todo-input'>
            <div className='todo-input-item'>
                <label>Title</label>
                <input
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="What's the task title?"
                />
                {titleError && <div className="error-message">{titleError}</div>}
            </div>
            <div className='todo-input-item'>
                <label>Description</label>
                <input
                    type='text'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What's the task description?"
                />
                {descriptionError && <div className="error-message">{descriptionError}</div>}
            </div>
            <div className='todo-input-item'>
                <button type='button' onClick={handleAddTodo} disabled={isLoading} className='primaryBtn'>{isLoading ? 'Adding...' : 'Add Todo'}</button>
            </div>
        </div>
    );
};

export default todoForm;
