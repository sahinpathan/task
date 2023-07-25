import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
