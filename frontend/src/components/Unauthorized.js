import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <Link to="/" style={{ color: '#EA5444', textDecoration: 'none' }}>
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;