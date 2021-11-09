import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Error from './error';


function Register(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const fillUserName = (e) => setUserName(e.target.value);
    const fillPassword = (e) => setPassword(e.target.value);
    const fillConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const submitForm = (e) => {
        e.preventDefault();

        let csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];

        fetch('/register', {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `username=${userName}&password=${password}&password_confirmation=${confirmPassword}&_token=${csrfToken}`
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.message === 'success'){
                    location.href = '/'
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
            <span>Register</span>
            <form onSubmit={submitForm}>
                <Error display={showError} />
                <input type="text" maxLength="30" minLength="3" placeholder="User name" onChange={fillUserName} value={userName} />
                <input type="text" maxLength="20" minLength="3" placeholder="Password" onChange={fillPassword} value={password} />
                <input type="text" maxLength="20" minLength="5" placeholder="Confirm Password" onChange={fillConfirmPassword} value={confirmPassword} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

ReactDOM.render(<Register />, document.getElementById('content'));