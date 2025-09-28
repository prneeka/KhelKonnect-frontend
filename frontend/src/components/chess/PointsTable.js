import React from 'react';

const PointsTable = ({ players }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No.</th>
            <th style={styles.th}>Player</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Score</th>
            <th style={styles.th}>Wins</th>
            <th style={styles.th}>Draws</th>
            <th style={styles.th}>Losses</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.no} style={styles.tr}>
              <td style={styles.td}>{player.no}</td>
              <td style={styles.td}>{player.name}</td>
              <td style={styles.td}>{player.rating}</td>
              <td style={styles.td}>{player.score}</td>
              <td style={styles.td}>{player.wins}</td>
              <td style={styles.td}>{player.draws}</td>
              <td style={styles.td}>{player.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
    },
    th: {
        backgroundColor: '#e3f2fd', // Light Blue
        color: '#0d47a1', // Dark Blue
        padding: '12px 15px',
        textAlign: 'left',
        fontWeight: '600',
    },
    tr: {
        borderBottom: '1px solid #eee',
    },
    td: {
        padding: '12px 15px',
        color: '#333',
    },
};

export default PointsTable;
