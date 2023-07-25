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

const PublicRoutes = (props) => {
  const auth = useAuth();
  if (auth) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;
