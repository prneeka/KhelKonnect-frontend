import React from 'react';
import { useNavigate } from 'react-router-dom';
import { allEventsData } from './EventData'; // Import from the new data file

const EventsList = () => {
  const navigate = useNavigate();
  const events = allEventsData; // Use the imported data

  return (
    <div style={styles.page}>
      <h1 style={styles.mainTitle}>
        Explore <span style={{ color: '#EA5444' }}>Upcoming Events</span>
      </h1>
      <div style={styles.eventsGrid}>
        {events.map((event) => (
          <div
            key={event.id}
            style={styles.eventCard}
            onClick={() => navigate(`/events/${event.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(234, 84, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            <img src={event.image} alt={event.name} style={styles.eventImage} />
            <div style={styles.cardContent}>
              <h2 style={styles.eventName}>{event.name}</h2>
              <p style={styles.eventInfo}>
                {event.date} | {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '40px 20px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '40px',
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  eventImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '20px',
  },
  eventName: {
    fontSize: '22px',
    margin: '0 0 10px 0',
    color: '#333',
  },
  eventInfo: {
    fontSize: '14px',
    color: '#666',
  },
};

export default EventsList;

