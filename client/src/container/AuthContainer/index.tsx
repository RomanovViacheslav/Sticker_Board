import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../../components/page/AuthPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { userLogin } from '../../network/user';
import { loginFail, loginPending, loginSuccess } from '../../store/loginSlice/loginSlice';
import getUserProfile from '../../store/userSlice/userActions';

const AuthContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.login);
  const [errorAPI, setErrorAPI] = useState(false);

  const sendData = async (email: string, password: string) => {
    dispatch(loginPending());
    try {
      const response = await userLogin(email, password);

      if (response.status === 'error') {
        dispatch(loginFail(response.message));
        setErrorAPI(true);
      } else if (response === 'Network Error') {
        dispatch(loginFail('Ошибка сервера'));
        setErrorAPI(true);
      } else {
        dispatch(loginSuccess());
        dispatch(getUserProfile());
        navigate('/');
      }
    } catch (e: unknown) {
      dispatch(loginFail(e));
      setErrorAPI(true);
    }
  };

  return <AuthPage isLoading={isLoading} error={error} sendData={sendData} errorAPI={errorAPI} />;
};

export default AuthContainer;
