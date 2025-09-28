import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EventsDashboard = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/player/dashboard', {
          withCredentials: true 
        });
        const data = await response.json();


        if (data.success) {
          const events = data.tournaments.map(tournament => ({
            eventName: tournament.name,
            sport: tournament.sport || 'General Tournament', 
            date: new Date(tournament.date.seconds * 1000).toLocaleDateString(),
            status: tournament.status || 'Registered',
            teamName: null, 
          }));
          setRegisteredEvents(events);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  if (isLoading) return <p>Loading your events...</p>;

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
