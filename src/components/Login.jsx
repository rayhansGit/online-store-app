/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/actionCreators/authActions';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    return (
        <div className='container login-component'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Login</h1>
                    <form data-testid="login-form" onSubmit={handleFormSubmit}>
                        <label>Username</label>
                        <input
                            type={'text'}
                            className="form-control"
                            data-testid="email-input"
                            onChange={(e) => { setUsername(e.target.value) }}
                            required
                        >
                        </input>
                        <label>Password</label>
                        <input
                            type={'password'}
                            className="form-control"
                            data-testid="password-input"
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        >
                        </input>
                        <input
                            type={'submit'}
                            className='btn btn-success mt-1 float-right'
                            data-test-id="login-button">
                        </input>
                    </form>
                </div>
            </div>
        </div>
    );

    function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(logIn({
            'email': username,
            'password': password
        }));
    }
};

export default Login;
