import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/session";
import { fetchTests } from '../../store/tests';
import TestIndexItem from '../TestsIndexItem';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);

    // Returns all the tests in state that belong to the user (Tests created by the User)
    const myTests = useSelector(state => Object.values(state.tests).filter(test => test.creator._id === currentUser._id));

    useEffect(() => {
        dispatch(fetchTests());
    }, [])

    const endSession = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }


    return (
        <>
        <div className="profile">
            <h1>Welcome back, {currentUser.username}</h1>

            <h1>My Tests</h1>
            <ul>
                {
                    myTests.map(test => <li key={test._id}>
                        <TestIndexItem test={test}/>
                    </li>)
                }
            </ul>

            <button className="logout" onClick={endSession}>Log Out</button>
        </div>
        </>
    )
}

export default Profile;