import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();

  // Mock user data - this would come from your app's state or context later
  const user = {
    name: 'Priya Sharma',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=PS'
  };

  const handleLogout = () => {
    // In a real app, you'd clear the user's session/token here
    navigate('/');
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.profileSection}>
        <img src={user.avatar} alt="User Avatar" style={styles.avatar} />
        <h2 style={styles.userName}>{user.name}</h2>
      </div>

      <nav style={styles.nav}>
        <button
          style={activeView === 'events' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}
          onClick={() => setActiveView('events')}
        >
          📅 Events
        </button>
        <button
          style={activeView === 'settings' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}
          onClick={() => setActiveView('settings')}
        >
          ⚙️ Settings
        </button>
      </nav>

      <div style={styles.footer}>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px',
    border: '3px solid #EA5444',
  },
  userName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  navLink: {
    padding: '12px 15px',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '500',
    color: '#333',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  activeLink: {
    backgroundColor: '#fff5f3',
    color: '#EA5444',
    fontWeight: '700',
  },
  footer: {
    marginTop: 'auto',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#EA5444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Sidebar;
