import React, { useState, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Error from './error';
import store from './store';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { updateTodosList, selectTodos } from './todos-slice';

function Todos(){

    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const [updateTarget, setUpdateTarget] = useState(null);
    const [showAddTodoForm, setShowAddTodoForm] = useState(false);
    const [showEditTodoForm, setShowEditTodoForm] = useState(false);

    useEffect(
        () => {
            fetch('/todos', {
                method: 'get'
            }).then(
                response => response.json()
            ).then(
                data => {
                    if (data.message === 'success'){
                        dispatch(updateTodosList(data.todos))
                    }
                }
            ).catch(function (error) {
                console.log('Request failed', error);
            });
        },[]
    );

    const editTodo = (e) => {
        document.querySelector('#content').style.overflow = 'hidden';

        const parent = e.target.parentElement.parentElement;

        setShowEditTodoForm(true);
        setUpdateTarget(parent)
    };

    const deleteTodo = (e) => {
        const todoItem = e.target.parentElement.parentElement;
        const todoId = todoItem.dataset.id;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];

        todoItem.remove();

        fetch(`/todos/${todoId}`, {
            method: 'delete',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "X-CSRF-TOKEN": csrfToken
            }
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    const addNewTodo = () => {
        document.querySelector('#content').style.overflow = 'hidden';
        setShowAddTodoForm(true);
    }

    const dismissAddTodoForm = () => {
        document.querySelector('#content').style.overflow = 'visible';
        setShowAddTodoForm(false)
    };

    const dismissEditTodoForm = () => {
        document.querySelector('#content').style.overflow = 'visible';
        setShowEditTodoForm(false)
    };

    const showTodos = (todosArray) => {
        const todos = [...todosArray];
        todos.sort((a, b) => b.id - a.id);
        if (todos.length > 0){
            return todos.map((todo) => 
                <div key={todo.id.toString()} className="todo" data-id={todo.id.toString()}>
                    <div>
                        <b>Created:</b>&nbsp;&nbsp;<span>{todo.created_at.replace('.000000Z', '').replace('T', ' ')}</span>
                    </div>
                    <div>
                        {todo.note}
                    </div>
                    <div className="item-foot">
                        <div>
                            <b>Deadline:</b>&nbsp;&nbsp;<span>{todo.deadline}</span>
                        </div>
                        <div onClick={deleteTodo}>DELETE</div>
                        <div onClick={editTodo}>EDIT</div>
                    </div>
                </div>
            )
        }
        return <div className="no-todos">No todos added</div>;
    }

    return (
        <Fragment>
            <div id="todo-list">
                <button onClick={addNewTodo}>Add Todo</button>
                {showTodos(todos)}
            </div>
            <AddTodo dispatch={dispatch} display={showAddTodoForm} dismissForm={dismissAddTodoForm} />
            <EditTodo display={showEditTodoForm} target={updateTarget} dismissForm={dismissEditTodoForm} />
        </Fragment>
    );
}

function AddTodo({dispatch, display, dismissForm}){

    const [showError, setShowError] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [addNote, setAddNote] = useState('');

    const submitTodo = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];
        const formatDateTime = (dateTime.includes('T'))? dateTime.replace('T', ' ')+':00':dateTime;
        fetch('/todos', {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `deadline=${formatDateTime}&note=${addNote}&_token=${csrfToken}`
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    dispatch(updateTodosList([data.todo]));
                    dismissForm();
                    setDateTime('');
                    setAddNote('');
                } else {
                    setShowError(true);
                }
            }
        ).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    if (display){
        return (
            <div id="add-todo" onClick={(e) => dismissForm()}>
                <div onClick={(e) => e.stopPropagation()}>
                    <Error display={showError} />
                    <form onSubmit={submitTodo}>
                        <input type="datetime-local" placeholder="Deadline" onChange={(e) => setDateTime(e.target.value)} value={dateTime} required /> 
                        <textarea onChange={(e) => setAddNote(e.target.value)} value={addNote} required></textarea>
                        <button type="submit">Add Todo</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
}

function EditTodo({display, target, dismissForm}){

    const [showError, setShowError] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [addNote, setAddNote] = useState('');

    if (target && dateTime.length === 0){
        const currentNote = target.children[1].innerText;
        const currentDeadline = target.querySelectorAll('span')[1].innerText;

        setDateTime(currentDeadline);
        setAddNote(currentNote);
    }

    const submitUpdate = (e) => {

        e.preventDefault();

        const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];
        const formatDateTime = (dateTime.includes('T'))? dateTime.replace('T', ' ')+':00':dateTime;
        const todoId = target.dataset.id;

        fetch(`/todos/${todoId}`, {
            method: 'put',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `deadline=${formatDateTime}&note=${addNote}&_token=${csrfToken}`
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    target.children[1].innerText = addNote;
                    target.querySelectorAll('span')[1].innerText = formatDateTime;
                    dismissForm();
                } else {
                    setShowError(true);
                }
            }
        ).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    if (display){
        return (
            <div id="add-todo" onClick={(e) => dismissForm()}>
                <div onClick={(e) => e.stopPropagation()}>
                    <Error display={showError} />
                    <form onSubmit={submitUpdate}>
                        <input type="datetime-local" placeholder="Deadline" onChange={(e) => setDateTime(e.target.value)} defaultValue={dateTime} required /> 
                        <textarea onChange={(e) => setAddNote(e.target.value)} defaultValue={addNote} required></textarea>
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
}

ReactDOM.render(
    <Provider store={store}>
        <Todos />
    </Provider>,
    document.getElementById('content')
)