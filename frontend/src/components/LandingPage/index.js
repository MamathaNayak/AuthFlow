import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { firstName, lastName } = location.state || {};

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='landing-page'>
        <h1>
          {firstName && lastName
            ? `${getGreeting()}, ${firstName} ${lastName}`
            : 'Welcome!'}
        </h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default LandingPage;

