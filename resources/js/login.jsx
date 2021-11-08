import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function Login(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const fillUserName = (e) => setUserName(e.target.value);
    const fillPassword = (e) => setPassword(e.target.value);

    const submitForm = (e) => {
        e.preventDefault();

        let csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];

        fetch('/login', {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `username=${userName}&password=${password}&_token=${csrfToken}`
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    location.href = '/profile'
                } else {
                    setShowError(true);
                }
            }
        ).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    return (
        <div id="form">
            <span>Login</span>
            <form onSubmit={submitForm}>
                <Error display={showError} />
                <input type="text" maxLength="30" minLength="3" placeholder="User name" onChange={fillUserName} value={userName} />
                <input type="text" maxLength="20" minLength="3" placeholder="Password" onChange={fillPassword} value={password} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

function Error({display}){
    if (display){
        return <div id="error">Incorrect email or password</div>
    }
    return null;
}

ReactDOM.render(<Login />, document.getElementById('content'));