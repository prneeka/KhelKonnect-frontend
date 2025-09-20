import React from 'react';
import { useNavigate } from 'react-router-dom';

const SportDetailsModal = ({ sport, eventId, onClose }) => {
  const navigate = useNavigate();
  if (!sport) return null;

  const handleRegister = () => {
    // Navigate to the dynamic registration page URL
    navigate(`/register/${eventId}/${sport.id}`);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={styles.title}>{sport.name} Details</h2>
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <span style={styles.label}>Prize Pool</span>
            <span style={styles.value}>{sport.prize}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Registration Fee</span>
            <span style={styles.value}>{sport.fee}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Players</span>
            <span style={styles.value}>{sport.players}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Location</span>
            <span style={styles.value}>{sport.location}</span>
          </div>
        </div>
        <button 
          style={styles.registerButton}
          onClick={handleRegister} // Use the new handler
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d34836'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EA5444'}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      },
      modal: {
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        fontFamily: 'sans-serif',
      },
      closeButton: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '28px',
        color: '#888',
        cursor: 'pointer',
      },
      title: {
        fontSize: '28px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '25px',
        color: '#EA5444',
      },
      detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px',
      },
      detailItem: {
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #eee',
      },
      label: {
        display: 'block',
        fontSize: '14px',
        color: '#777',
        marginBottom: '5px',
      },
      value: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
      },
      registerButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#EA5444',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      },
};

export default SportDetailsModal;

