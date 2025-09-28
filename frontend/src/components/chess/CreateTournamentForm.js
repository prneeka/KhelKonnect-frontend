import React, { useState } from 'react';

const CreateTournamentForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location) return;
    onCreate({ name, location });
    setName('');
    setLocation('');
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create New Tournament</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Create Tournament
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  title: {
    fontSize: '22px',
    color: '#0d47a1', // Dark Blue
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f57c00', // Orange
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default CreateTournamentForm;
