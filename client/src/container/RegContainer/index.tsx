import React from 'react';
import RegPage from '../../components/page/RegPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

const RegContainer = () => {
  const dispatch = useAppDispatch();

  return <RegPage />;
};

export default RegContainer;
