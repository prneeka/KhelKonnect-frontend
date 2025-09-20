import React from 'react';

const RoundSelector = ({ totalRounds, selectedRound, onSelectRound }) => {
  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  return (
    <select
      value={selectedRound}
      onChange={(e) => onSelectRound(Number(e.target.value))}
      style={styles.select}
    >
      {rounds.map((round) => (
        <option key={round} value={round}>
          Round {round}
        </option>
      ))}
    </select>
  );
};

const styles = {
  select: {
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    minWidth: '120px',
  },
};

export default RoundSelector;
