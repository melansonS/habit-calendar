import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function ProtectedRoute({ element }: {element: JSX.Element}) {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return element;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
