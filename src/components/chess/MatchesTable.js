import React from 'react';

const MatchesTable = ({ matches }) => {
  const handleAction = (matchNumber) => {
    // In a real app, this would open a modal to select the winner
    console.log(`Update winner for match ${matchNumber}`);
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No.</th>
            <th style={styles.th}>Black</th>
            <th style={styles.th}>Result</th>
            <th style={styles.th}>White</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.no} style={styles.tr}>
              <td style={styles.td}>{match.no}</td>
              <td style={styles.td}>{match.black}</td>
              <td style={styles.td}>{match.result}</td>
              <td style={styles.td}>{match.white}</td>
              <td style={styles.td}>
                <span style={styles.status(match.status)}>{match.status}</span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.actionButton}
                  onClick={() => handleAction(match.no)}
                >
                  Update
                </button>
              </td>
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
    status: (status) => ({
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: status === 'Completed' ? '#c8e6c9' : '#ffcdd2',
        color: status === 'Completed' ? '#2e7d32' : '#c62828',
    }),
    actionButton: {
        padding: '6px 14px',
        backgroundColor: '#0d47a1', // Dark Blue
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '12px',
        cursor: 'pointer',
    },
};

export default MatchesTable;
