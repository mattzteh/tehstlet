import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import { getCurrentUser } from './store/session';

import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/SessionForms/LoginForm';
import SignUpForm from './components/SessionForms/SignUpForm';
import TestsIndex from './components/TestsIndex';
import Test from './components/Test';
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

        <Route exact path='/tests' element={<ProtectedRoute children={<TestsIndex />}/>} />
        <Route exact path='/tests/:testId' element={<ProtectedRoute children={ <Test />}/>} />
        <Route exact path='/profile/:userId' element={<ProtectedRoute children={<Profile />}/>} />

      </Routes>
    </>
  );
}

export default App;
