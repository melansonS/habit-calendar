import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function CatchAllRedirect() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/calendar" />;
  }
  return <Navigate to="/" />;
}

export default CatchAllRedirect;
