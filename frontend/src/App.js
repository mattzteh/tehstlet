import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import { getCurrentUser } from './store/session';
import Home from './components/Home';
import LoginForm from './components/SessionForms/LoginForm';
import SignUpForm from './components/SessionForms/SignUpForm';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
      <Routes>
		  <Route path="/" element={<Home/>} />
      </Routes>
  );
}

export default App;
