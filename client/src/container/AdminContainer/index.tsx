import React from 'react';
import { useParams } from 'react-router-dom';
import AdminPage from '../../components/page/AdminPage';

const AdminContainer = () => {
  const params = useParams();

  return <AdminPage />;
};

export default AdminContainer;
