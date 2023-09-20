import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCheckingAuth,
  selectIsAuthorized,
} from '../../redux/entities/User/selectors';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...props }) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const checkingAuth = useSelector(selectCheckingAuth);

  return (!checkingAuth) && (isAuthorized ? (
    <Component {...props}></Component>
  ) : (
    <Navigate to='/'></Navigate>
  ))
}
