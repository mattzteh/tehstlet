import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/session";


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);
    const tests = useSelector(state => state.tests);
    

    const userTests = Object.values(tests).filter(test => test.creator === currentUser._id)

    const endSession = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
        <div className="profile">
            <h1>Welcome back, {currentUser.username}</h1>

            <li>{userTests.title}</li>

            <button className="logout" onClick={endSession}>Log Out</button>
        </div>
        </>
    )
}

export default Profile;