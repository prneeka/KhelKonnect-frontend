import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizerDashboard = ({ user }) => {
  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rounds: '',
    date: '',
    location: ''
  });
  const [loading, setLoading] = useState({
    tournaments: false,
    createTournament: false,
    generateFixtures: {}
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(prev => ({ ...prev, tournaments: true }));
    setError('');
    try {
      const res = await fetch('http://localhost:3003/organizer/dashboard', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setTournaments(
        (data.tournaments || []).map(t => ({
          ...t,
          date: t.date?._seconds ? new Date(t.date._seconds * 1000).toLocaleDateString() : ""
        }))
      );
    } catch (err) {
      console.error("Failed to fetch tournaments:", err);
      setError('Failed to load tournaments');
    } finally {
      setLoading(prev => ({ ...prev, tournaments: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateFixture = async (tournamentId) => {
    const confirmed = window.confirm(`Generate fixtures for tournament ID: ${tournamentId}?`);
    if (!confirmed) return;

    setLoading(prev => ({ ...prev, generateFixtures: { ...prev.generateFixtures, [tournamentId]: true } }));
    try {
      const res = await fetch("http://localhost:3003/generatefixtures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournamentId })
      });

      const text = await res.text();
      alert(text);
      fetchTournaments(); // Refresh data instead of reloading page
    } catch (err) {
      alert("Error generating fixtures: " + err.message);
    } finally {
      setLoading(prev => ({ ...prev, generateFixtures: { ...prev.generateFixtures, [tournamentId]: false } }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, createTournament: true }));
    setError('');
    try {
      const response = await axios.post('http://localhost:3003/organizer/create-tournament', {
        name: formData.name,
        rounds: formData.rounds,
        date: formData.date,
        location: formData.location
      }, {
        withCredentials: true 
      });

      if (response.data.success) {
        alert('Tournament created successfully!');
        setFormData({ name: '', rounds: '', date: '', location: '' });
        fetchTournaments(); // Refresh the tournaments list
      } else {
        setError(response.data.message || 'Failed to create tournament');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating tournament");
    } finally {
      setLoading(prev => ({ ...prev, createTournament: false }));
    }
  };

  // Loading component
  const LoadingSpinner = ({ size = '20px' }) => (
    <div style={{
      width: size,
      height: size,
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #EA5444',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }}></div>
  );

  // CSS for spinner animation
  const spinnerStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', minHeight: '100vh' }}>
      <style>{spinnerStyle}</style>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
            style={{ width: '35px', height: '35px', borderRadius: '50%' }}
          />
          <h2 style={{ color: '#EA5444', margin: 0 }}>Welcome, Organizer</h2>
        </div>

        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center', fontWeight: 'bold', fontSize: '16px' }}>
          {['home', 'create', 'teams'].map((section, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <a
                href={`#${section}`}
                style={{ textDecoration: 'none', color: 'black' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#EA5444';
                  e.target.style.borderBottom = '2px solid #EA5444';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'black';
                  e.target.style.borderBottom = 'none';
                }}
              >
                {section === 'create' ? 'Create Tournament' : section === 'teams' ? 'Manage Teams' : 'Home'}
              </a>
              {idx < 2 && <span style={{ color: '#ccc' }}>|</span>}
            </span>
          ))}
          <span style={{ color: '#ccc' }}>|</span>
          <a
            href="/show-fixtures"
            style={{ textDecoration: 'none', color: 'black' }}
            onMouseEnter={(e) => {
              e.target.style.color = '#EA5444';
              e.target.style.borderBottom = '2px solid #EA5444';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'black';
              e.target.style.borderBottom = 'none';
            }}
          >
            Show Fixtures
          </a>
        </nav>
      </div>

      <hr style={{ marginTop: '15px' }} />

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '12px',
          borderRadius: '8px',
          margin: '20px 0',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {/* Home Section - Tournaments List */}
      <section id="home" style={{
        background: '#0F0F0F',
        color: 'white',
        borderRadius: '20px',
        padding: '60px 40px',
        margin: '40px auto',
        maxWidth: '1200px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
          Your Tournaments
        </h1>

        {loading.tournaments ? (
          <div style={{ padding: '40px' }}>
            <LoadingSpinner size="40px" />
            <p style={{ marginTop: '20px', color: '#CCCCCC' }}>Loading tournaments...</p>
          </div>
        ) : tournaments.length === 0 ? (
          <p style={{ fontSize: '18px', color: '#CCCCCC' }}>No tournaments created yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
            {tournaments.map((t) => (
              <li key={t.id} style={{
                backgroundColor: '#2B2B2B',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                textAlign: 'left'
              }}>
                <h2 style={{ color: '#EA5444', marginBottom: '10px' }}>{t.name}</h2>
                <p style={{ margin: '6px 0', fontSize: '16px' }}><strong>ID:</strong> {t.id}</p>
                <p style={{ margin: '6px 0', fontSize: '16px' }}><strong>Date:</strong> {t.date}</p>
                <p style={{ margin: '6px 0', fontSize: '16px' }}><strong>Location:</strong> {t.location}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr />

      {/* Create Tournament Section */}
      <section id="create" style={{ background: '#ffffff', padding: '60px 20px' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: '900',
          marginBottom: '40px',
          letterSpacing: '-0.5px',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ color: '#000000' }}>Host the </span>
          <span style={{ color: '#EA5444' }}>Ultimate Chess </span>
          <span style={{ color: '#000000' }}>Battle</span>
        </h2>

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}>
          {/* Left Info Panel */}
          <div style={{
            flex: '1 1 400px',
            padding: '50px 40px',
            backgroundColor: '#EA5444',
            color: '#000000'
          }}>
            <h3 style={{ fontSize: '35px', fontWeight: '900', marginBottom: '20px' }}>
              Launch a Chess Tournament Like Never Before
            </h3>
            <p style={{ fontSize: '18px', lineHeight: '1.7', marginBottom: '30px' }}>
              Whether it's Blitz, Rapid, or Classical — set up tournaments that cater to every kind of chess warrior. Choose a date, define your rules, and get ready for the board to ignite!
            </p>
            <ul style={{ fontSize: '12px', listStyle: 'none', paddingLeft: '0', fontSize: '15px' }}>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ⏱️ <span>Time-controlled or Open-ended Matches</span>
              </li>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🧠 <span>Swiss, Round-Robin, or Knockouts</span>
              </li>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🌍 <span>Play Locally or Host National Events</span>
              </li>
            </ul>
          </div>

          {/* Right Form Panel */}
          <div style={{
            flex: '1 1 400px',
            padding: '40px',
            backgroundColor: '#fafafa',
            color: '#000000'
          }}>
            <form onSubmit={handleSubmit}>
              {['name', 'rounds', 'date', 'location'].map((field, i) => {
                const labels = {
                  name: 'Tournament Name',
                  rounds: 'Number of Rounds',
                  date: 'Tournament Date',
                  location: 'Location'
                };
                return (
                  <div key={i} style={{ marginBottom: '24px' }}>
                    <label style={{
                      fontWeight: '600',
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px'
                    }}>{labels[field]}</label>
                    <input
                      type={field === 'date' ? 'date' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                      pattern={field === 'rounds' ? '^[0-9]+$' : field === 'name' ? '^[A-Za-z ]+$' : undefined}
                      title={field === 'rounds' ? 'Only numbers allowed' : field === 'name' ? 'Only letters and spaces allowed' : ''}
                      min={field === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border 0.3s',
                      }}
                      onFocus={(e) => e.target.style.border = '1px solid #EA5444'}
                      onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                    />
                  </div>
                );
              })}
              <button
                type="submit"
                disabled={loading.createTournament}
                style={{
                  width: '100%',
                  backgroundColor: loading.createTournament ? '#ccc' : '#EA5444',
                  color: '#000000',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading.createTournament ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px',
                  transition: 'background 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={e => !loading.createTournament && (e.currentTarget.style.backgroundColor = '#d23d30')}
                onMouseOut={e => !loading.createTournament && (e.currentTarget.style.backgroundColor = '#EA5444')}
              >
                {loading.createTournament ? (
                  <>
                    <LoadingSpinner size="16px" />
                    Creating...
                  </>
                ) : (
                  '➕ Create Tournament'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <hr />

      {/* Teams Section */}
      <section id="teams" style={{
        background: '#0F0F0F',
        color: '#F8FAFC',
        borderRadius: '20px',
        padding: '60px 40px',
        margin: '40px auto',
        maxWidth: '1200px',
        width: '95%',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: '900',
          color: '#ffffff',
          marginBottom: '40px',
          textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
        }}>
          Manage Teams
        </h2>

        {loading.tournaments ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <LoadingSpinner size="40px" />
            <p style={{ marginTop: '20px', color: '#94a3b8' }}>Loading tournaments...</p>
          </div>
        ) : tournaments.length === 0 ? (
          <p style={{ fontSize: '18px', color: '#94a3b8', textAlign: 'center' }}>No tournaments found.</p>
        ) : (
          tournaments.map((t) => (
            <div key={t.id} style={{
              backgroundColor: '#1E1E1E',
              padding: '24px',
              borderRadius: '14px',
              marginBottom: '30px',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f87171', marginBottom: '16px' }}>
                Tournament: {t.name} <span style={{ fontWeight: '400', color: '#facc15' }}>(ID: {t.id})</span>
              </h3>

              {t.players && t.players.length > 0 ? (
                <>
                  <ul style={{ paddingLeft: '20px', marginBottom: '20px', lineHeight: '1.8' }}>
                    {t.players.map((p, index) => (
                      <li key={index} style={{ fontSize: '16px' }}>
                        <span style={{ fontWeight: '600', color: '#93c5fd' }}>Name:</span> {p.name} &nbsp; | &nbsp;
                        <span style={{ fontWeight: '600', color: '#93c5fd' }}>Rating:</span> {p.rating}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => generateFixture(t.id)}
                    disabled={loading.generateFixtures[t.id]}
                    style={{
                      backgroundColor: loading.generateFixtures[t.id] ? '#666' : '#EA5444',
                      color: '#ffffff',
                      padding: '12px 20px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: loading.generateFixtures[t.id] ? 'not-allowed' : 'pointer',
                      transition: 'background 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={e => !loading.generateFixtures[t.id] && (e.currentTarget.style.backgroundColor = '#d43c2e')}
                    onMouseOut={e => !loading.generateFixtures[t.id] && (e.currentTarget.style.backgroundColor = '#EA5444')}
                  >
                    {loading.generateFixtures[t.id] ? (
                      <>
                        <LoadingSpinner size="16px" />
                        Generating...
                      </>
                    ) : (
                      '🛠 Generate Fixtures'
                    )}
                  </button>
                </>
              ) : (
                <p style={{ fontSize: '16px', color: '#cbd5e1' }}>No players have applied yet.</p>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default OrganizerDashboard;