import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const TournamentsList = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    tournament_name: '',
    location: '',
    status: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const [appliedName, setAppliedName] = useState('');

  const [submittedFilters, setSubmittedFilters] = useState({
    tournament_name: '',
    location: '',
    status: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Fetch tournaments with React Query using submittedFilters
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [
      "tournaments",
      appliedName,                 
      filters.location,
      filters.status,
      filters.page,
      filters.limit,
      filters.sortBy,
      filters.sortOrder
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
  
      if (appliedName) params.append('tournament_name', appliedName);
      if (filters.location) params.append('location', filters.location);
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
  
      params.append('page', filters.page);
      params.append('limit', filters.limit);
      params.append('order', filters.sortOrder);
  
      const response = await axios.get(
        `http://localhost:3003/public/alltournaments?${params.toString()}`,
        { withCredentials: true }
      );
      return response.data;
    },
    keepPreviousData: true,
    staleTime: 30000
  });
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 })); 
  };
  
  // Manual search for tournament name
  const handleApplyFilters = () => {
    setAppliedName(filters.tournament_name); // apply search name
    setFilters(prev => ({ ...prev, page: 1 })); // reset to page 1
  };
  
  // Pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };
  
  // Reset
  const clearFilters = () => {
    setFilters({
      tournament_name: '',
      location: '',
      status: '',
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setAppliedName('');
  };  
  const convertFirestoreTimestamp = (timestamp) => {
    if (!timestamp) return null;
    
    if (timestamp._seconds !== undefined) {
      return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    }

    return new Date(timestamp);
  };

  const handleSortChange = (sortBy, sortOrder) => {
    const newFilters = { ...filters, sortBy, sortOrder };
    setFilters(newFilters);
    setSubmittedFilters(newFilters);
  };

  if (isLoading) return <p style={styles.loading}>Loading tournaments...</p>;
  if (error) return <p style={styles.error}>Error loading tournaments: {error.message}</p>;

  const tournaments = data?.tournaments || [];
  const pagination = data?.pagination || {};

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tournaments</h1>

      {/* Filter Section */}
      <div style={styles.filterForm}>
        <input
          type="text"
          placeholder="Search by tournament name"
          value={filters.tournament_name}
          onChange={(e) => setFilters(prev => ({ ...prev, tournament_name: e.target.value }))}
          style={styles.filterInput}
        />
      
        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)} // ✅ auto apply
          style={styles.filterInput}
        />
      
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)} // ✅ auto apply
          style={styles.filterSelect}
        >
          <option value="">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      
        {/* Sorting auto applies too */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          style={styles.filterSelect}
        >
          <option value="createdAt">Created Date</option>
          <option value="date">Tournament Date</option>
          <option value="name">Name</option>
          <option value="location">Location</option>
        </select>
      
        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          style={styles.filterSelect}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      
        <select
          value={filters.limit}
          onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
          style={styles.filterSelect}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      
        <div style={styles.filterButtons}>
          <button onClick={handleApplyFilters} style={styles.applyButton}>
            Search
          </button>
          <button onClick={clearFilters} style={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(submittedFilters.tournament_name || submittedFilters.location || submittedFilters.status) && (
        <div style={styles.activeFilters}>
          <strong>Active Filters:</strong>
          {submittedFilters.tournament_name && (
            <span style={styles.filterTag}>Name: "{submittedFilters.tournament_name}"</span>
          )}
          {submittedFilters.location && (
            <span style={styles.filterTag}>Location: "{submittedFilters.location}"</span>
          )}
          {submittedFilters.status && (
            <span style={styles.filterTag}>Status: {submittedFilters.status}</span>
          )}
          <span style={styles.filterTag}>
            Sort: {submittedFilters.sortBy} ({submittedFilters.sortOrder})
          </span>
        </div>
      )}

      {/* Loading indicator */}
      {isFetching && <div style={styles.refreshIndicator}>Refreshing...</div>}

      {/* Tournaments List */}
      {tournaments.length > 0 ? (
        <div>
          <div style={styles.tournamentList}>
            {tournaments.map((tournament) => (
              <div key={tournament.id} style={styles.tournamentCard}>
                <div style={styles.tournamentInfo}>
                  <h2 style={styles.tournamentName}>{tournament.name}</h2>
                  <p style={styles.tournamentLocation}>
                    <strong>Location:</strong> {tournament.location}
                  </p>
                  <p style={styles.tournamentDate}>
                    <strong>Date:</strong> {convertFirestoreTimestamp(tournament.date)?.toLocaleDateString() || 'N/A'}
                  </p>
                  <p style={styles.tournamentRounds}>
                    <strong>Rounds:</strong> {tournament.rounds}
                  </p>
                  <p style={styles.tournamentCreated}>
                    <strong>Created:</strong>  {convertFirestoreTimestamp(tournament.date)?.toLocaleDateString() || 'N/A'}
                  </p>
                </div>
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(tournament.status)
                }}>
                  {tournament.status?.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                style={styles.paginationButton}
              >
                Previous
              </button>

              <span style={styles.pageInfo}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                style={styles.paginationButton}
              >
                Next
              </button>
            </div>
          )}

          <div style={styles.paginationInfo}>
            Showing {tournaments.length} of {pagination.totalItems} tournaments
          </div>
        </div>
      ) : (
        <p style={styles.noResults}>
          {submittedFilters.tournament_name || submittedFilters.location || submittedFilters.status 
            ? 'No tournaments found matching your search criteria.'
            : 'No tournaments available.'
          }
        </p>
      )}
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming': return '#fef3c7';
    case 'active': return '#dcfce7';
    case 'completed': return '#e5e7eb';
    default: return '#e5e7eb';
  }
};

const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '30px',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
    },
    loading: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#666',
      padding: '40px'
    },
    error: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#dc2626',
      padding: '40px',
      backgroundColor: '#fef2f2',
      borderRadius: '10px'
    },
    filterForm: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px'
    },
    filterInput: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px'
    },
    filterSelect: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      backgroundColor: 'white'
    },
    filterButtons: {
      display: 'flex',
      gap: '10px',
      alignItems: 'end'
    },
    applyButton: {
      padding: '10px 20px',
      backgroundColor: '#EA5444',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600',
      flex: 1
    },
    clearButton: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      flex: 1
    },
    activeFilters: {
      padding: '15px',
      backgroundColor: '#e0f2fe',
      borderRadius: '8px',
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      alignItems: 'center'
    },
    filterTag: {
      padding: '5px 12px',
      backgroundColor: '#0ea5e9',
      color: 'white',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '500'
    },
    refreshIndicator: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      borderRadius: '5px',
      marginBottom: '20px'
    },
    tournamentList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '30px'
    },
    tournamentCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      borderLeft: '5px solid #EA5444',
    },
    tournamentInfo: {
      flex: 1
    },
    tournamentName: {
      margin: '0 0 10px 0',
      fontSize: '20px',
      color: '#333',
    },
    tournamentLocation: {
      margin: '0 0 8px 0',
      fontSize: '14px',
      color: '#666',
    },
    tournamentDate: {
      margin: '0 0 8px 0',
      fontSize: '14px',
      color: '#666',
    },
    tournamentRounds: {
      margin: 0,
      fontSize: '14px',
      color: '#666',
    },
    statusBadge: {
      padding: '8px 15px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#333',
      minWidth: '80px',
      textAlign: 'center'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '15px'
    },
    paginationButton: {
      padding: '10px 20px',
      backgroundColor: '#EA5444',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600',
      minWidth: '100px'
    },
    pageInfo: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#333'
    },
    paginationInfo: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#666',
      marginBottom: '30px'
    },
    noResults: {
      textAlign: 'center',
      fontSize: '16px',
      color: '#666',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px'
    },
  tournamentCreated: {
    margin: '0 0 8px 0',
    fontSize: '12px',
    color: '#888',
    fontStyle: 'italic'
  }
};

export default TournamentsList;