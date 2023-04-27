import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ children }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return !loggedIn ? <>{ children }</> : <Navigate to="/tests" />;
}


export const ProtectedRoute = ({ children }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return loggedIn ? <>{ children }</> : <Navigate to='/login'/>
}