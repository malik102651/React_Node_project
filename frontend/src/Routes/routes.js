import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authentication, children }) => {
    return authentication ? children : <Navigate to="/" />
};
const PublicRoute = ({ authentication, children }) => {
    return authentication ? <Navigate to="/" /> : children
  };
export {PrivateRoute,PublicRoute};