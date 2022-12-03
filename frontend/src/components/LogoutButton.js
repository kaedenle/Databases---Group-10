import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user_data');
    navigate('/');
  };

  return (
    <Button
      variant="link"
      onClick={logout}
      className="text-decoration-none text-center text-white"
    >
      Log Out
    </Button>
  );
}
export default LogoutButton;
