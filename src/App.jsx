import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './views/auth-views/login';
import Register from './views/auth-views/register';
import Navbar from './views/navBar/NavBar';
import Threads from './views/app-views/threads';
import ThreadPageDetail from './views/app-views/threads/components/ThreadPageDetail';
import CreateThreadForm from './views/app-views/threads/components/ThreadCreatePage';
import BottomNavBar from './views/navBar/BottomNavBar';
import Leaderboards from './views/app-views/leaderboards';
import store from './store/store';

function Main() {
  const location = useLocation();

  const shouldHideNavBars = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!shouldHideNavBars && (
        <>
          <Navbar />
          <BottomNavBar />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/threads/:threadId" element={<ThreadPageDetail />} />
        <Route path="/create" element={<CreateThreadForm />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <Main />
        </Provider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
