import { PaginationProps } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
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
  const [limit, setLimit] = useState('3');
  const [page, setPage] = useState('1');
  const [count, setCount] = useState('');

  const getProductsUser = async () => {
    try {
      dispatch(getAdsPending());
      const result = await getAdsUser(limit, page);
      console.log(result);

      if (result) {
        dispatch(getAdsSuccess(result.rows));
        dispatch(getAdsFilter(result.rows));
        setCount(result.count);
      }
    } catch (error: any) {
      dispatch(getAdsFail(error.message));
    }
  };

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setPage(String(pageNumber));
  };

  useLayoutEffect(() => {
    getProductsUser();
  }, [page]);
  return (
    <AdminPage limit={limit} onChange={onChange} count={count} getProductsUser={getProductsUser} />
  );
};

export default AdminContainer;
