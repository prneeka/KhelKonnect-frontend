// chess/ChessDashboard.js

import React, { useState } from 'react';
import CreateTournamentForm from './CreateTournamentForm';
import TournamentList from './TournamentList';
import FixtureDisplay from './FixtureDisplay';

// Mock data for demonstration
const mockTournaments = [
  { id: 1, name: 'Mumbai Open 2024', location: 'Mumbai', rounds: 5, players: 16 },
  { id: 2, name: 'Pune Chess Masters', location: 'Pune', rounds: 7, players: 24 },
];

const ChessDashboard = () => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [selectedTournament, setSelectedTournament] = useState(mockTournaments[0]);

  const handleCreateTournament = (tournament) => {
    const newTournament = { ...tournament, id: tournaments.length + 1 };
    setTournaments([...tournaments, newTournament]);
  };

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.header}>♟️ Chess Organization Dashboard</h1>
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <CreateTournamentForm onCreate={handleCreateTournament} />
          <TournamentList
            tournaments={tournaments}
            onSelectTournament={setSelectedTournament}
            selectedTournament={selectedTournament}
          />
        </div>
        <div style={styles.rightPanel}>
          {selectedTournament ? (
            <FixtureDisplay tournament={selectedTournament} />
          ) : (
            <p>Select a tournament to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '40px',
    backgroundColor: '#f0f4f8',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
  },
  header: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#0d47a1', // Dark Blue
    marginBottom: '30px',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    gap: '30px',
  },
  leftPanel: {
    flex: '1',
    maxWidth: '400px',
  },
  rightPanel: {
    flex: '2',
  },
};

export default ChessDashboard;
