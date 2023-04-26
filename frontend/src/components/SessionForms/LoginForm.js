import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, clearSessionErrors } from '../../store/session';
import './SessionForms.css';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.session);

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        }
    }, [dispatch])

    const update = (field) => {
        const setState = field === 'username' ? setUsername : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
    }


    return (
        <>
            <form className='session-form' onSubmit={handleSubmit}>

                <h1>Sign In</h1>

                <div className='errors'>{errors?.email}</div>
                <label>
                    <span>Email</span>
                    <input
                    type='text'
                    value={username}
                    onChange={update('username')}
                    placeholder='Username'
                    />
                </label>

                <div className='errors'>{errors?.email}</div>
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
        </>
    )
}

export default LoginForm;