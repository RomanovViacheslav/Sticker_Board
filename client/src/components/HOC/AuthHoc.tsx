/* eslint-disable react/jsx-no-useless-fragment */

import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';

const AuthHoc: React.FC = ({ children }) => {
  const { isUser } = useAppSelector((state) => state.user);
  const isAuth = isUser;
  if (isAuth) {
    return <>{children}</>;
  }

  return <Navigate to="/auth" />;
};

export default AuthHoc;
