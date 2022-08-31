import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminPage from '../../components/page/AdminPage';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getAdsUser } from '../../network/ads';
import {
  getAdsFail,
  getAdsFilter,
  getAdsPending,
  getAdsSuccess,
} from '../../store/adsSlice/adsSlice';

const AdminContainer = () => {
  const dispatch = useAppDispatch();

  const getProductsUser = async () => {
    try {
      dispatch(getAdsPending());
      const result = await getAdsUser();
      if (result) {
        dispatch(getAdsSuccess(result.rows));
        dispatch(getAdsFilter(result.rows));
      }
    } catch (error: any) {
      dispatch(getAdsFail(error.message));
    }
  };

  useLayoutEffect(() => {
    getProductsUser();
  }, []);
  return <AdminPage getProductsUser={getProductsUser} />;
};

export default AdminContainer;
