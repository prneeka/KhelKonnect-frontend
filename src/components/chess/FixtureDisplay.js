import React, { useState } from 'react';
import PointsTable from './PointsTable';
import MatchesTable from './MatchesTable';
import RoundSelector from './RoundSelector';

// Mock data for a single tournament's details
const mockPlayers = [
  { no: 1, name: 'Magnus Carlsen', rating: 2830, score: 3, wins: 3, draws: 0, losses: 0 },
  { no: 2, name: 'Hikaru Nakamura', rating: 2788, score: 2, wins: 2, draws: 0, losses: 1 },
  { no: 3, name: 'Fabiano Caruana', rating: 2804, score: 2, wins: 2, draws: 0, losses: 1 },
  { no: 4, name: 'Anish Giri', rating: 2762, score: 1, wins: 1, draws: 0, losses: 2 },
  { no: 5, name: 'R Praggnanandhaa', rating: 2747, score: 1, wins: 1, draws: 0, losses: 2 },
];

const mockMatches = [
    { no: 1, black: 'Magnus Carlsen', white: 'Anish Giri', result: '1-0', status: 'Completed' },
    { no: 2, black: 'Hikaru Nakamura', white: 'R Praggnanandhaa', result: '0-1', status: 'Completed' },
    { no: 3, black: 'Fabiano Caruana', white: 'Player F', result: '...', status: 'Pending' },
];


const FixtureDisplay = ({ tournament }) => {
  const [selectedRound, setSelectedRound] = useState(1);
  const totalRounds = tournament.rounds || 5;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.tournamentName}>{tournament.name}</h2>
          <p style={styles.tournamentLocation}>{tournament.location}</p>
        </div>
        <div style={styles.controls}>
          <RoundSelector
            totalRounds={totalRounds}
            selectedRound={selectedRound}
            onSelectRound={setSelectedRound}
          />
          <button style={styles.generateButton}>Generate Next Round</button>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Points Table (Round {selectedRound})</h3>
        <PointsTable players={mockPlayers} />
      </div>

      <div style={{marginTop: '30px'}}>
        <h3 style={styles.sectionTitle}>Matches (Round {selectedRound})</h3>
        <MatchesTable matches={mockMatches} />
      </div>
    </div>
  );
};

const styles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px',
        marginBottom: '20px',
    },
    tournamentName: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#0d47a1', // Dark Blue
        margin: 0,
    },
    tournamentLocation: {
        fontSize: '16px',
        color: '#555',
        margin: '5px 0 0',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    generateButton: {
        padding: '10px 18px',
        backgroundColor: '#f57c00', // Orange
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: '20px',
        color: '#0d47a1',
        marginBottom: '15px',
    }
};

export default FixtureDisplay;
