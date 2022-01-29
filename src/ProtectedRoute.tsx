import { Auth } from 'aws-amplify';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let user = null;
      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log(e);
        setIsAuthenticated(false);
      }
    })();
  })
  return (
    isAuthenticated ? React.createElement(component) : <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
