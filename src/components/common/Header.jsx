import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLogoutUser } from '../../redux/actions/authActions';
import '../../styles/Header.css'; // Buat file styling ini

function Header({ authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="container">
        <h1>
          <Link to="/">Forum Diskusi</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Threads</Link>
            </li>
            <li>
              <Link to="/leaderboards">Leaderboard</Link>
            </li>
            {authUser ? (
              <>
                <li>
                  <img
                    src={authUser.avatar || '/assets/default-avatar.png'}
                    alt={authUser.name}
                    className="avatar-small"
                  />
                  <span>
                    {authUser.name}
                  </span>
                </li>
                <li>
                  <button type="button" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
