import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoutes: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  return isAuth ? children : <Navigate to="/" replace />;
};
