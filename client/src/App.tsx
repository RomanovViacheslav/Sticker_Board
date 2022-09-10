import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import RegContainer from './container/RegContainer';
import PageWrapper from './components/common/PageWrapper';
import AuthContainer from './container/AuthContainer';
import AdminContainer from './container/AdminContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';

import getUserProfile from './store/userSlice/userActions';

import AuthHoc from './components/HOC/AuthHoc';
import MainContainer from './container/MainContainer/MainContainer';
import AddingContainer from './container/AddingContainer';
import AdOne from './components/page/AdOnePage';
import AdOneContainer from './container/AdOneContainer/AdOneContainer';
import SearchContainer from './container/SearcContainer';

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
        <Route path="product/:id" element={<AdOneContainer />} />
        <Route path="search" element={<SearchContainer />} />
        <Route
          path="admin/:id"
          element={
            <AuthHoc>
              <AdminContainer />
            </AuthHoc>
          }
        />
        <Route
          path="myads/:id"
          element={
            <AuthHoc>
              <AdminContainer />
            </AuthHoc>
          }
        />

        <Route
          path="adding"
          element={
            <AuthHoc>
              <AddingContainer />
            </AuthHoc>
          }
        />
        <Route path="*" element={<h1>NOT FOUND </h1>} />
      </Route>
    </Routes>
  );
};

export default App;
