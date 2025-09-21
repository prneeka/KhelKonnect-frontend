import React from 'react';

// Mock data for the events the user has registered for
const registeredEvents = [
  {
    eventName: 'Agility Intercollege Meet',
    sport: 'Cricket',
    date: 'October 25-28, 2024',
    status: 'Upcoming',
    teamName: 'Spartan Strikers',
  },
  {
    eventName: 'Community Chess Championship',
    sport: 'Classical Chess',
    date: 'December 1-2, 2024',
    status: 'Upcoming',
    teamName: null, // For individual sports
  },
];

const EventsDashboard = () => {
  return (
    <div>
      <h1 style={styles.header}>My Registered Events</h1>
      {registeredEvents.length > 0 ? (
        <div style={styles.eventList}>
          {registeredEvents.map((event, index) => (
            <div key={index} style={styles.eventCard}>
              <div>
                <h2 style={styles.eventName}>{event.eventName}</h2>
                <p style={styles.sportName}>{event.sport}</p>
                {event.teamName && <p style={styles.teamName}>Team: {event.teamName}</p>}
                <p style={styles.eventDate}>Date: {event.date}</p>
              </div>
              <div style={styles.statusBadge}>
                {event.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not registered for any events yet.</p>
      )}
    </div>
  );
};

const styles = {
  header: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  eventCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderLeft: '5px solid #EA5444',
  },
  eventName: {
    margin: '0 0 5px 0',
    fontSize: '20px',
    color: '#333',
  },
  sportName: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#666',
    fontWeight: '600',
  },
  teamName: {
      margin: '0 0 10px 0',
      fontSize: '14px',
      color: '#777',
  },
  eventDate: {
    margin: 0,
    fontSize: '14px',
    color: '#777',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default EventsDashboard;
