import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegPage from '../../components/page/RegPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { registration } from '../../network/user';
import { regError, regPending, regSuccess } from '../../store/regSlice/regSlice';

const RegContainer = () => {
  const { isLoading, message } = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorAPI, setErrorAPI] = useState(false);
  const sendData = async (Name: string, surName: string, email: string, password: string) => {
    try {
      dispatch(regPending());

      const result = await registration(Name, surName, email, password);

      if (result.status === 'error') {
        dispatch(regError(result.message));

        setErrorAPI(true);
      } else if (result === 'Network Error') {
        dispatch(regError('Ошибка сервера'));
        setErrorAPI(true);
      } else {
        dispatch(regSuccess(result.message));
        navigate('/auth');
      }
    } catch (error: any) {
      dispatch(regError(error));
      console.log(error);
    }
  };

  return (
    <RegPage isLoading={isLoading} message={message} errorAPI={errorAPI} sendData={sendData} />
  );
};

export default RegContainer;
