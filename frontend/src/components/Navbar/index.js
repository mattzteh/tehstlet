import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { debounce } from '../../util/animations';

import './Navbar.css';

const Navbar = () => {

    const currentUser = useSelector(state => state.session.user);

    let profileLink;

    if (currentUser) {
        profileLink = (
            <Link to={`/profile/${currentUser._id}`}>Profile</Link>
        )
    } else {
        profileLink = (
            <Link to={'/login'}>Log In</Link>
        )
    }
    

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
  
    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    }, 100);
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, isVisible, handleScroll]);

    return (
        <>
        <div className='navbar' style={{top: isVisible ? '0' : '-60px'}}>
            <div className='home-link'>
                <Link to="/">Home</Link>
            </div>
            <div className='tests-link'>
                <Link to='/tests'>Tests</Link>
            </div>
            <div className='profile-link'>{profileLink}</div>
        </div>

        </>
    )
}

export default Navbar;