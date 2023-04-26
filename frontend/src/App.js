import { Routes, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>

      <Route exact path="/" element={<AuthRoute/>}>
			<Route exact path="/" element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
