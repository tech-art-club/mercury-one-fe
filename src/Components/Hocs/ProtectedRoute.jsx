import { selectAuth } from '../../Store/Slices/authReducer';
import { useSelector } from 'react-redux';
import Auth from '../../Pages/Auth/Auth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectAuth).isAuth;

  return isAuthenticated ? (
    <div key={isAuthenticated}>{children}</div>
  ) : (
    <Auth />
  );
};

export default ProtectedRoute;
