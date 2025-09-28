import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SportDetailsModal from './SportDetailsModal.js';
import { allEventsData } from './EventData.js';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [selectedSport, setSelectedSport] = useState(null);
  const [hoveredSport, setHoveredSport] = useState(null);

  const eventData = allEventsData.find(
    (event) => event.id === parseInt(eventId)
  );

  if (!eventData) {
    return <div style={styles.page}><h1>Event not found!</h1></div>;
  }

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const closeModal = () => {
    setSelectedSport(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left Column: Event Details */}
        <div style={styles.leftColumn}>
          <img src={eventData.image} alt={eventData.name} style={styles.eventImage} />
          <h1 style={styles.title}>{eventData.name}</h1>
          <p style={styles.eventInfo}>
            <strong>Date:</strong> {eventData.date}
          </p>
          <p style={styles.eventInfo}>
            <strong>Location:</strong> {eventData.location}
          </p>
          <p style={styles.description}>{eventData.description}</p>
        </div>

        {/* Right Column: Sports List */}
        <div style={styles.rightColumn}>
          <h2 style={styles.sportsTitle}>Available Sports</h2>
          <div style={styles.sportsList}>
            {eventData.sports.map((sport) => (
              <div
                key={sport.id}
                style={{...styles.sportItem, ...(hoveredSport === sport.id ? styles.sportItemHover : {})}}
                onClick={() => handleSportClick(sport)}
                onMouseEnter={() => setHoveredSport(sport.id)}
                onMouseLeave={() => setHoveredSport(null)}
              >
                <div>
                  <h3 style={styles.sportName}>{sport.name}</h3>
                  <p style={styles.sportPrize}>Prize Pool: {sport.prize}</p>
                </div>
                <span style={styles.sportTag}>{sport.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedSport && (
        <SportDetailsModal 
          sport={selectedSport} 
          eventId={eventData.id} // Pass the event ID to the modal
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

const styles = {
    page: {
        padding: '40px 20px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'sans-serif',
        minHeight: '100vh',
      },
      container: {
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      },
      leftColumn: {
        flex: 1.5,
      },
      rightColumn: {
        flex: 1,
        borderLeft: '1px solid #e0e0e0',
        paddingLeft: '40px',
      },
      eventImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '20px',
      },
      title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#EA5444',
        marginBottom: '10px',
      },
      eventInfo: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
      },
      description: {
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6',
      },
      sportsTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#333',
        marginBottom: '20px',
      },
      sportsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      },
      sportItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid #eee',
      },
      sportItemHover: {
        transform: 'translateX(5px)',
        boxShadow: '0 4px 12px rgba(234, 84, 68, 0.2)',
        backgroundColor: '#fff5f3'
      },
      sportName: {
        fontSize: '18px',
        margin: 0,
        fontWeight: '600',
        color: '#333',
      },
      sportPrize: {
        fontSize: '14px',
        color: '#777',
        margin: '5px 0 0 0',
      },
      sportTag: {
        backgroundColor: '#e0eafc',
        color: '#3f51b5',
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold',
      },
};

export default EventDetailsPage;

