import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';

import './SessionForms.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.session);

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        }
    },[])

    const update = (field) => {
        return (e) => {
            switch (field) {
                case 'email':
                    setEmail(e.currentTarget.value);
                    break;
                case 'username':
                    setUsername(e.currentTarget.value);
                    break;
                case 'firstName':
                    setFirstName(e.currentTarget.value);
                    break;
                case 'lastName':
                    setLastName(e.currentTarget.value);
                    break;
                case 'password':
                    setPassword(e.currentTarget.value);
                    break;
                case 'password2':
                    setPassword2(e.currentTarget.value);
                    break;
                default:
                    throw Error('Unknown Field in Signup Form');
            }
        }
    }

    const usernameSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            username,
            firstName,
            lastName,
            password
        }
        dispatch(signup(user));
    }

    return (
        <>
            <form className='session-form' onSubmit={usernameSubmit}>

                <h1>Sign Up</h1>

                <div className='errors'>{errors?.email}</div>
                <label>
                    <span>Email</span>
                    <input
                    type='text'
                    value={email}
                    onChange={update('email')}
                    placeholder='Email'
                    />
                </label>

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

                <div className='errors'>{errors?.firstName}</div>
                <label>
                    <span>First Name</span>
                    <input
                    type='text'
                    value={firstName}
                    onChange={update('firstName')}
                    placeholder='First Name'
                    />
                </label>

                <div className='errors'>{errors?.lastName}</div>
                <label>
                    <span>Last Name</span>
                    <input
                    type='text'
                    value={lastName}
                    onChange={update('lastName')}
                    placeholder='Last Name'
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

                <div className='errors'>
                    {password !== password2 && "Passwords does not match!"}
                </div>
                <label>
                    <span>Confirm Password</span>
                    <input
                    type='password'
                    value={password2}
                    onChange={update('password2')}
                    placeholder='Confirm Password'
                    />
                </label>

                <input
                type='submit'
                value='Create Account'
                disabled={!email || !username || !firstName || !lastName || !password || password !== password2 }
                />

            </form>
        </>
    )
}

export default SignUpForm;


