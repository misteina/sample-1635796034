import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Error from './error';

function Todos(){

    const [deadline, setDeadline] = useState('');
    const [note, setNote] = useState('');
    const [showTodoForm, setShowTodoForm] = useState(false);

    const editTodo = (e) => {
        document.querySelector('#content').style.overflow = 'hidden';

        const currentNote = e.target.parentElement.parentElement.children[1].innerText;
        const currentDeadline = e.target.parentElement.parentElement.querySelectorAll('span')[1].innerText;

        setShowTodoForm(true);
        setDeadline(currentDeadline);
        setNote(currentNote);
    };

    const deleteTodo = (e) => {
        const todoId = e.target.parentElement.parentElement.dataset.id;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];

        fetch(`/todos/${todoId}`, {
            method: 'delete',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "'X-CSRF-TOKEN": csrfToken
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    // 
                }
            }
        ).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    const addNewTodo = () => {
        document.querySelector('#content').style.overflow = 'hidden';
        setDeadline('');
        setNote('');
        setShowTodoForm(true);
    }

    const dismissForm = () => {
        document.querySelector('#content').style.overflow = 'visible';
        setShowTodoForm(false)
    };

    return (
        <Fragment>
            <div id="todo-list">
            <button onClick={addNewTodo}>Add Todo</button>
                <div className="todo" data-id="1">
                    <div>
                        <b>Created:</b>&nbsp;&nbsp;<span>2021-12-03 03:00:00</span>
                    </div>
                    <div>
                        This the noteh
                    </div>
                    <div className="item-foot">
                        <div>
                            <b>Deadline:</b>&nbsp;&nbsp;<span>2021-12-03 03:00:00</span>
                        </div>
                        <div onClick={deleteTodo}>DELETE</div>
                        <div onClick={editTodo}>EDIT</div>
                    </div>
                </div>
            </div>
            <AddTodo display={showTodoForm} deadline={deadline} note={note} dismissForm={dismissForm} />
        </Fragment>
    );
}

function AddTodo({display, deadline, note, dismissForm}){

    const [showError, setShowError] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [addNote, setAddNote] = useState('');

    const defaultDateTime = dateTime.length > 0 ? dateTime : deadline;
    const defaultNote = addNote.length > 0?  addNote : note;

    const submitTodo = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];
        fetch('/todos', {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `deadline=${deadline}&note=${note}&_token=${csrfToken}`
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    //
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
                        <input type="datetime-local" placeholder="Deadline" onChange={(e) => setDateTime(e.target.value)} defaultValue={defaultDateTime} /> 
                        <textarea onChange={(e) => setAddNote(e.target.value)} defaultValue={defaultNote}></textarea>
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
}

ReactDOM.render(<Todos />, document.getElementById('content'));