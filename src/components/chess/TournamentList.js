import React from 'react';

const TournamentList = ({ tournaments, onSelectTournament, selectedTournament }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Tournaments</h2>
      <ul style={styles.list}>
        {tournaments.map((tournament) => (
          <li
            key={tournament.id}
            onClick={() => onSelectTournament(tournament)}
            style={
              selectedTournament?.id === tournament.id
                ? { ...styles.listItem, ...styles.selectedItem }
                : styles.listItem
            }
          >
            <span style={styles.tournamentName}>{tournament.name}</span>
            <span style={styles.tournamentLocation}>{tournament.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '22px',
    color: '#0d47a1', // Dark Blue
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd', // Light Blue
    fontWeight: '600',
  },
  tournamentName: {
    color: '#333',
  },
  tournamentLocation: {
    fontSize: '14px',
    color: '#777',
  },
};

export default TournamentList;
