import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout, isAuthenticated } from '../../utils/auth';

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); 
    navigate('/login', { state: { message: 'Logged out successfully!' } });
  }

  return (
    <nav className="navbar navbar-expand-lg topbar" style={{ background: 'linear-gradient(90deg, #8e2de2, #ff6a95)', color: '#fff' }}>
      <div className="container">
        <Link className="navbar-brand brand" to="/" style={{ color: '#fff', fontWeight: '600' }}>
          HelpDesk
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#fff' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: '#fff' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ color: '#fff' }}>Sign up</Link>
                </li>
              </>
            )}

            {isAuthenticated() && (
              <>
                {user?.role === 'EMPLOYEE' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/employee" style={{ color: '#ffffffff' }}>Employee</Link>
                  </li>
                )}
                {user?.role === 'AGENT' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/agent" style={{ color: '#fff' }}>Agent</Link>
                  </li>
                )}
                {user?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin" style={{ color: '#fff' }}>Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link small text-light">
                    Hi, {user?.name || user?.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-light btn-sm"
                    onClick={handleLogout}
                    style={{
                      background: 'linear-gradient(90deg, #ffdd00, #ff6a00)', 
                      color: '#000', 
                      border: 'none',
                      fontWeight: '600',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      transition: '0.3s',
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                    onMouseOut={e => e.currentTarget.style.opacity = 1}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
