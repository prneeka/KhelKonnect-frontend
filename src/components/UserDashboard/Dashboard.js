import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EventsDashboard from './EventsDashboard';
import Settings from './Settings';

const UserDashboard = () => {
  const [activeView, setActiveView] = useState('events');

  const renderView = () => {
    switch (activeView) {
      case 'events':
        return <EventsDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <EventsDashboard />;
    }
  };

  return (
    <div style={styles.page}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div style={styles.content}>
        {renderView()}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  content: {
    flex: 1,
    padding: '40px',
  },
};

export default UserDashboard;
