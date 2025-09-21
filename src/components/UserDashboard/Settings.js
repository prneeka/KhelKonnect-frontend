import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1 style={styles.header}>Settings</h1>
      <div style={styles.container}>
        <p style={styles.placeholderText}>
          User settings and profile management options will be available here in a future update.
        </p>
      </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  container: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: '16px',
    color: '#777',
    lineHeight: '1.6',
  },
};

export default Settings;
