/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actionCreators/authActions';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    return (<div className='container register-component'>
        <div className='row'>
            <div className='col-md-12'>
                <h1>Registration</h1>
                <form data-testid="register-form" onSubmit={handleFormSubmit}>
                    <label>Name</label>
                    <input
                        type={'text'}
                        className="form-control"
                        data-testid="name-input"
                        onChange={(e) => { setName(e.target.value) }}
                        required>
                    </input>
                    <label>E-mail</label>
                    <input
                        type={'text'}
                        className="form-control"
                        data-testid="email-input"
                        onChange={(e) => { setEmail(e.target.value) }}
                        required>
                    </input>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className="form-control"
                        data-testid="password-input"
                        onChange={(e) => { setPassword(e.target.value) }}
                        required>
                    </input>
                    <label>Password confirmation</label>
                    <input
                        type={'password'}
                        className="form-control"
                        data-testid="passwordConfirmation-input"
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        required>
                    </input>
                    <input
                        type={'submit'}
                        className='btn btn-success mt-1 float-right'
                        data-test-id="login-button">
                    </input>
                </form>
            </div>
        </div>
    </div>);

    function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(register({
            'name':name,
            'email':email,
            'password':password,
            'confirm_password':confirmPassword
        }));
    }
};



export default Register;
