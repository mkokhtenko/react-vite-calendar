import './App.css'
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { EventPage } from './pages/EventPage/EventPage';
import { Navbar } from './components/shared';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="event" element={<EventPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
