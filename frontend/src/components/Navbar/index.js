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
            <div className='profile-link'>
                <Link to={`/profile/${currentUser._id}`} className='profile'>Profile</Link>
            </div>
        )
    } else {
        profileLink = (
            <div className='profile-links'>
                <div className='login'><Link to={'/login'}>Log In</Link></div>
                <div className='signup'><Link to={'/signup'}>Sign Up</Link></div>
            </div>
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
            
            <div className='home-link'><Link to="/">Tehslet</Link></div>

            <div className='right-links'>
                <div className='tests-link'><Link to='/tests'>Browse</Link></div>
                {profileLink}
            </div>

        </div>

        </>
    )
}

export default Navbar;