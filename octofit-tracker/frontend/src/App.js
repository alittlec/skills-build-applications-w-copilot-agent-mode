import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="container py-4 py-md-5">
      <header className="card border-0 shadow-sm mb-4 octofit-header-card">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
                alt="OctoFit logo"
                className="octofit-logo"
              />
              <h1 className="display-6 octofit-heading mb-0">OctoFit Tracker</h1>
            </div>
            <a className="link-primary fw-semibold" href="https://getbootstrap.com" target="_blank" rel="noreferrer">
              Bootstrap Docs
            </a>
          </div>
          <p className="octofit-subtext mt-2 mb-0">
            Explore activities, teams, users, workouts, and leaderboard data from the Django REST API.
          </p>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg octofit-nav rounded-3 px-3 mb-4 shadow-sm">
        <span className="navbar-brand fw-semibold text-white">Navigation</span>
        <div className="navbar-nav nav-pills gap-2">
          <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
