import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allEventsData } from './EventData';

const RegistrationPage = () => {
  const { eventId, sportId } = useParams();
  const navigate = useNavigate();

  const eventData = allEventsData.find((event) => event.id === parseInt(eventId));
  const sportData = eventData?.sports.find((sport) => sport.id === parseInt(sportId));

  const [teamName, setTeamName] = useState('');
  // Initialize with the minimum number of players required for team sports
  const initialPlayerCount = sportData?.type === 'Team' ? sportData.minPlayers : 1;
  const [players, setPlayers] = useState(
    Array.from({ length: initialPlayerCount }, () => ({ name: '', age: '', phone: '', idProof: null }))
  );
  
  if (!eventData || !sportData) {
    return <div style={{...styles.page, ...styles.centered}}><h1>Event or Sport not found!</h1></div>;
  }

  // Safely get prize info
  const prizeInfo = eventData.prizeDistribution?.find(p => p.sport === sportData.name);
  const isTeamSport = sportData.type === 'Team';
  const maxTeamSize = (sportData.maxPlayers || 0) + (sportData.maxSubstitutes || 0);

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    // Logic to enforce player limits
    if (players.length < maxTeamSize) {
      setPlayers([...players, { name: '', age: '', phone: '', idProof: null }]);
    }
  };
  
  // New function to remove a player
  const removePlayer = (indexToRemove) => {
    if (players.length > (sportData.minPlayers || 1)) {
        setPlayers(players.filter((_, index) => index !== indexToRemove));
    } else {
        alert(`You must have at least ${sportData.minPlayers} players.`);
    }
  };

  const handleFileChange = (index, file) => {
    const newPlayers = [...players];
    newPlayers[index].idProof = file;
    setPlayers(newPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ teamName, players });
    alert('Proceeding to payment gateway (simulated).');
  };

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate(`/events/${eventId}`)}>
        ← Back to Event
      </button>
      <div style={styles.container}>
        {/* Left Column: Event & Sport Details */}
        <div style={styles.leftColumn}>
          <img src={sportData.image || eventData.image} alt={sportData.name} style={styles.eventImage} />
          <h1 style={styles.sportTitle}>Register for {sportData.name}</h1>
          <div style={styles.infoBox}>
            <p><strong>Fee:</strong> {sportData.fee}</p>
            <p><strong>Venue:</strong> {sportData.location}</p>
            <p><strong>Organizer:</strong> {eventData.organizer?.name} ({eventData.organizer?.contact})</p>
          </div>
          <h2 style={styles.subheading}>Prize Pool Distribution</h2>
          {prizeInfo ? (
            <table style={styles.prizeTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Position</th>
                  <th style={styles.tableHeader}>Prize</th>
                </tr>
              </thead>
              <tbody>
                  <tr><td style={styles.tableCell}>1st Place</td><td style={styles.tableCell}>{prizeInfo.first}</td></tr>
                  {prizeInfo.second && <tr><td style={styles.tableCell}>2nd Place</td><td style={styles.tableCell}>{prizeInfo.second}</td></tr>}
                  {prizeInfo.third && <tr><td style={styles.tableCell}>3rd Place</td><td style={styles.tableCell}>{prizeInfo.third}</td></tr>}
              </tbody>
            </table>
          ) : (
            <p>Prize distribution details are not available for this sport.</p>
          )}
        </div>

        {/* Right Column: Registration Form */}
        <div style={styles.rightColumn}>
          <h2 style={styles.subheading}>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            {isTeamSport && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Team Name</label>
                <input type="text" style={styles.input} value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
              </div>
            )}

            {players.map((player, index) => (
              <div key={index} style={styles.playerSection}>
                 <div style={styles.playerHeaderContainer}>
                    {/* Feature 1: Differentiate the Captain */}
                    <h3 style={styles.playerHeader}>{isTeamSport && index === 0 ? 'Captain' : `Player ${index + 1}`}</h3>
                    {/* Feature 3: Button to remove a player */}
                    {players.length > sportData.minPlayers && (
                      <button type="button" style={styles.removeButton} onClick={() => removePlayer(index)}>Remove</button>
                    )}
                </div>
                <input type="text" placeholder="Full Name" style={styles.input} value={player.name} onChange={(e) => handlePlayerChange(index, 'name', e.target.value)} required />
                <input type="number" placeholder="Age" style={styles.input} value={player.age} onChange={(e) => handlePlayerChange(index, 'age', e.target.value)} required />
                <input type="tel" placeholder="Phone Number" style={styles.input} value={player.phone} onChange={(e) => handlePlayerChange(index, 'phone', e.target.value)} required />
                <label style={styles.label}>ID Proof (PDF or Image)</label>
                <input type="file" style={styles.fileInput} onChange={(e) => handleFileChange(index, e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png" required />
              </div>
            ))}
            
            {/* Feature 2: Enforce player limits */}
            {isTeamSport && players.length < maxTeamSize && (
              <button type="button" style={styles.addButton} onClick={addPlayer}>
                + Add Player / Substitute (up to {maxTeamSize - players.length} more)
              </button>
            )}

            <button type="submit" style={styles.payButton}>Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
    page: { padding: '40px', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' },
    centered: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'},
    container: { display: 'flex', gap: '50px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' },
    leftColumn: { flex: 1 },
    rightColumn: { flex: 1, borderLeft: '1px solid #e0e0e0', paddingLeft: '50px' },
    backButton: { background: 'none', border: 'none', color: '#EA5444', fontSize: '16px', cursor: 'pointer', fontWeight: '600', marginBottom: '20px' },
    eventImage: { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' },
    sportTitle: { color: '#EA5444', fontSize: '32px', fontWeight: '700' },
    infoBox: { backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px', lineHeight: '1.6' },
    subheading: { fontSize: '22px', fontWeight: '600', borderBottom: '2px solid #EA5444', paddingBottom: '5px', marginBottom: '15px' },
    prizeTable: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
    tableHeader: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' },
    tableCell: { padding: '8px', borderBottom: '1px solid #eee' },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', fontWeight: '600', marginBottom: '5px' },
    input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '10px' },
    fileInput: { width: '100%', padding: '10px', boxSizing: 'border-box' },
    playerSection: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
    playerHeaderContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    playerHeader: { marginTop: 0, marginBottom: 0, color: '#333' },
    removeButton: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
    addButton: { backgroundColor: '#e0eafc', color: '#3f51b5', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', width: '100%', marginBottom: '20px' },
    payButton: { width: '100%', padding: '15px', backgroundColor: '#EA5444', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }
};

export default RegistrationPage;

