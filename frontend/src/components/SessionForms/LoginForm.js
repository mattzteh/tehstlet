import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, clearSessionErrors } from '../../store/session';
import './SessionForms.css';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(state => state.errors.session);

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        }
    },[dispatch])

    const update = (field) => {
        return (e) => {
            switch (field) {
                case 'username':
                    setUsername(e.currentTarget.value);
                    break;
                case 'password':
                    setPassword(e.currentTarget.value);
                    break;
                default:
                    throw Error('Unknown field in Login Form.');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
        navigate('/tests');
    }

    const loginDemoUser = (e) => {
        e.preventDefault();
        dispatch(login({ username: 'DemoUser', password: 'password' }));
        navigate('/tests');
    }


    return (
        <>
            <form className='session-form' onSubmit={handleSubmit}>

                <h1>Sign In</h1>

                <div className='errors'>{errors?.username}</div>
                <label>
                    <span>Username</span>
                    <input
                    type='text'
                    value={username}
                    onChange={update('username')}
                    placeholder='Username'
                    />
                </label>

                <div className='errors'>{errors?.password}</div>
                <label>
                    <span>Password</span>
                    <input
                    type='password'
                    value={password}
                    onChange={update('password')}
                    placeholder='Password'
                    />
                </label>
                <input
                    type='submit'
                    value="Log In"
                    disabled={!username || !password}
                />
            </form>

            <button onClick={loginDemoUser}>Demo User</button>
        </>
    )
}

export default LoginForm;