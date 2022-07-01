import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import RegContainer from './container/RegContainer';
import PageWrapper from './components/common/PageWrapper';
import AuthContainer from './container/AuthContainer';
import AdminContainer from './container/AdminContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { getUser } from './network/user';
import getUserProfile from './store/userSlice/userActions';
import { loginSuccess } from './store/loginSlice/loginSlice';
import AuthHoc from './components/HOC/AuthHoc';
import MainContainer from './container/MainContainer/MainContainer';

const App = () => {
  const { isUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserProfile());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PageWrapper />}>
        <Route index element={<MainContainer />} />
        {!isUser && <Route path="reg" element={<RegContainer />} />}
        {!isUser && <Route path="auth" element={<AuthContainer />} />}
        <Route
          path="admin/:id"
          element={
            <AuthHoc>
              <AdminContainer />
            </AuthHoc>
          }
        />
        <Route path="*" element={<h1>NOT FOUND </h1>} />
      </Route>
    </Routes>
  );
};

export default App;
