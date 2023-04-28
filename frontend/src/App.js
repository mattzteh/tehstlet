import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import { getCurrentUser } from './store/session';

import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/SessionForms/LoginForm';
import SignUpForm from './components/SessionForms/SignUpForm';
import Tests from './components/Tests';
import Profile from './components/Profile';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<AuthRoute children={<Home />}/>}/>
        <Route exact path='/login' element={<AuthRoute children={<LoginForm />}/>}/>
        <Route exact path='/signup' element={<AuthRoute children={<SignUpForm />}/>}/>
        <Route exact path='/tests' element={<ProtectedRoute children={<Tests />}/>} />
        <Route exact path='/:userId' element={<ProtectedRoute children={<Profile />}/>}></Route>

      </Routes>
    </>
  );
}

export default App;
