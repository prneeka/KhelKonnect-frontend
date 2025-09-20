import agilityMeetImage from '../../assets/Agility_volleyball.png';
import corporateLeagueImage from '../../assets/corporate-league.jpeg';
import chessChampionshipImage from '../../assets/chess-championship.jpeg';

// This is our central data source for all events
export const allEventsData = [
  {
    id: 1,
    name: 'Agility Intercollege Meet',
    date: 'October 25-28, 2024',
    location: 'Mumbai University Ground',
    description:
      'An annual inter-college sports festival bringing together the best talent from across the city for a week of intense competition and sportsmanship.',
    image: agilityMeetImage,
    organizer: {
        name: 'Priya Sharma',
        contact: 'priya.sharma@khelkonnect.com',
    },
    prizeDistribution: [
        { sport: 'Cricket', first: '₹25,000', second: '₹15,000', third: '₹10,000' },
        { sport: 'Football', first: '₹20,000', second: '₹12,000', third: '₹8,000' },
    ],
    sports: [
        { id: 101, name: 'Cricket', type: 'Team', prize: '₹50,000', fee: '₹2,000/team', players: '11 per side', location: 'Bhavans Ground', minPlayers: 11, maxPlayers: 11, maxSubstitutes: 3 },
        { id: 102, name: 'Football', type: 'Team', prize: '₹40,000', fee: '₹1,500/team', players: '9 per side', location: 'Andheri Turf', minPlayers: 9, maxPlayers: 9, maxSubstitutes: 3 },
        { id: 103, name: 'Volleyball', type: 'Team', prize: '₹30,000', fee: '₹1,200/team', players: '6 per side', location: 'Mumbai University Court', minPlayers: 6, maxPlayers: 6, maxSubstitutes: 2 },
        { id: 104, name: 'Badminton', type: 'Both', prize: '₹10,000', fee: '₹500/person', players: '1 (single) or 2 (double)', location: 'Andheri Sports Complex' },
        { id: 105, name: 'Table Tennis', type: 'Both', prize: '₹10,000', fee: '₹400/person', players: '1 (single) or 2 (double)', location: 'Andheri Sports Complex' },
        { id: 106, name: 'Chess', type: 'Individual', prize: '₹15,000', fee: '₹300/person', players: '1', location: 'SPIT Library' },
        { id: 107, name: 'Carrom', type: 'Individual', prize: '₹8,000', fee: '₹200/person', players: '1', location: 'SPIT Gymkhana' },
    ],
  },
  {
    id: 2,
    name: 'Corporate Sports League',
    date: 'November 5-7, 2024',
    location: 'Andheri Sports Complex',
    description: 'A thrilling sports event designed for corporate teams to foster teamwork and healthy competition outside the office.',
    image: corporateLeagueImage,
    organizer: {
        name: 'Rajesh Kumar',
        contact: 'rajesh.kumar@khelkonnect.com',
    },
    prizeDistribution: [
        { sport: 'Box Cricket', first: '₹15,000', second: '₹10,000' },
    ],
    sports: [
        { id: 201, name: 'Box Cricket', type: 'Team', prize: '₹25,000', fee: '₹1,800/team', players: '8 per side', location: 'Juhu Box Arena', minPlayers: 8, maxPlayers: 8, maxSubstitutes: 2 },
        { id: 202, name: 'Badminton', type: 'Both', prize: '₹12,000', fee: '₹600/person', players: '1 or 2', location: 'Andheri Sports Complex' },
        { id: 203, name: 'Table Tennis', type: 'Individual', prize: '₹12,000', fee: '₹500/person', players: '1', location: 'Andheri Sports Complex' },
    ],
  },
  {
    id: 3,
    name: 'Community Chess Championship',
    date: 'December 1-2, 2024',
    location: 'Dadar Chess Club',
    description: 'A classic chess tournament open to all age groups to find the sharpest mind in the community.',
    image: chessChampionshipImage,
    organizer: {
        name: 'Anjali Mehta',
        contact: 'anjali.mehta@khelkonnect.com',
    },
    prizeDistribution: [
        { sport: 'Classical Chess', first: '₹12,000', second: '₹8,000' },
    ],
    sports: [
        { id: 301, name: 'Classical Chess', type: 'Individual', prize: '₹20,000', fee: '₹400/person', players: '1', location: 'Main Hall' },
        { id: 302, name: 'Blitz Chess', type: 'Individual', prize: '₹10,000', fee: '₹250/person', players: '1', location: 'Room B' },
    ],
  },
];

