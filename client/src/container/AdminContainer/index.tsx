import { PaginationProps } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminPage from '../../components/page/AdminPage';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteAdUser, getAdsUser } from '../../network/ads';
import { adOneClear } from '../../store/adOneSlice/adOneSlice';
import {
  getAdsFail,
  getAdsFilter,
  getAdsPending,
  getAdsSuccess,
} from '../../store/adsSlice/adsSlice';

const AdminContainer = () => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState('8');
  const [page, setPage] = useState('1');
  const [count, setCount] = useState('');
  const [search, setSearch] = useState('');
  const [deleteIdAd, setDeleteIdAd] = useState('');

  const getProductsUser = async () => {
    try {
      dispatch(getAdsPending());
      const result = await getAdsUser(limit, page, search);

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

  const deleteProduct = async () => {
    try {
      await deleteAdUser(deleteIdAd);
      getProductsUser();
    } catch (error: any) {
      dispatch(getAdsFail(error.message));
    }
  };

  useEffect(() => {
    dispatch(adOneClear());
  }, []);

  useEffect(() => {
    if (deleteIdAd !== '') {
      deleteProduct();
    }
  }, [deleteIdAd]);

  useLayoutEffect(() => {
    getProductsUser();
  }, [page]);
  return (
    <AdminPage
      value={search}
      setValue={setSearch}
      limit={limit}
      onChange={onChange}
      count={count}
      getProductsUser={getProductsUser}
      setDeleteIdAd={setDeleteIdAd}
    />
  );
};

export default AdminContainer;
