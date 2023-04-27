import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from '../../util/animations';

import './Navbar.css';

const Navbar = () => {

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
                <Link exact to='/'>Home</Link>
            </div>
            <div className='tests-link'>
                <Link to='/tests'>Tests</Link>
            </div>
            <div className='profile-link'>
                <Link to='/profile'>Profile</Link>
            </div>
        </div>

        </>
    )
}

export default Navbar;