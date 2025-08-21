import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const NonAuthenticatedRoute = ({ children }) => {
  const { isAuthticated } = useSelector((store) => store.userSlice || {});
  if (!isAuthticated) {
    return <Navigate to="/register" />;
  }
  return children;
};
export const AuthenticatedRoute = ({ children }) => {
  const { isAuthticated } = useSelector((store) => store.userSlice || {});
  if (isAuthticated) {
    return <Navigate to="/" />;
  }
  return children;
};
export const AdminRoute = ({ children }) => {
  const { user, isAuthticated } = useSelector((store) => store.userSlice || {});
  if (!isAuthticated) {
    return <Navigate to="/register" />;
  }
  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }
  return children;
};
