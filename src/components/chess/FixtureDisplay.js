import React, { useState } from 'react';
import RoundSelector from './RoundSelector';
import PointsTable from './PointsTable';
import MatchesTable from './MatchesTable';

const FixtureDisplay = ({ tournament }) => {
  // --- FIX ---
  // Hooks must be called at the top level, before any returns.
  const [selectedRound, setSelectedRound] = useState(1);

  // Now we can have our condition and early return.
  if (!tournament) {
    return (
      <div style={styles.container}>
        <p style={styles.placeholder}>Select a tournament to view its fixtures.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>{tournament.name}</h2>
          <p style={styles.location}>{tournament.location}</p>
        </div>
        <RoundSelector
          totalRounds={tournament.rounds}
          selectedRound={selectedRound}
          onRoundChange={setSelectedRound}
        />
      </div>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Points Table (Round {selectedRound})</h3>
        <PointsTable round={selectedRound} />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Matches (Round {selectedRound})</h3>
        <MatchesTable round={selectedRound} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 3,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
  },
  placeholder: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
    marginTop: '50px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    color: '#004080', // Blue
    margin: 0,
  },
  location: {
    fontSize: '16px',
    color: '#555',
    margin: '5px 0 0 0',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '15px',
  },
};

export default FixtureDisplay;

