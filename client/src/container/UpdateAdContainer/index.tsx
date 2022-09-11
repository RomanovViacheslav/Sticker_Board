import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddingPage from '../../components/page/AddingPage/AddingPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAdOne, getAdUserOne, updateAd } from '../../network/ads';
import {
  adOneClear,
  getAdOneFail,
  getAdOnePending,
  getAdOneSuccess,
} from '../../store/adOneSlice/adOneSlice';
import {
  createAdError,
  createAdPending,
  createAdSuccess,
} from '../../store/createAd/createAdSlice';

const UpdateAdContainer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, ad, isAd, error } = useAppSelector((state) => state.adOne);
  const { user } = useAppSelector((state) => state.user);
  const dataUser: any = user;
  const isAdmin = dataUser.role === 'ADMIN';
  const navigate = useNavigate();
  const sendData = async (
    title: string,
    price: string,
    phone: string,
    file: any,
    location: string,
    category: string,
    description: string,
    published?: string
  ) => {
    try {
      dispatch(createAdPending());
      const result = await updateAd(
        id,
        title,
        price,
        phone,
        file,
        location,
        category,
        description,
        published
      );

      if (result === 'Network Error') {
        dispatch(createAdError('Ошибка сервера'));
      } else {
        dispatch(createAdSuccess(result.message));
        navigate('/');
      }
    } catch (e: any) {
      dispatch(createAdError(e));
    }
  };

  const getProductOne = async () => {
    try {
      dispatch(getAdOnePending());
      const result = await getAdUserOne(id);

      if (result.status === 200) {
        dispatch(getAdOneSuccess(result.data));
      }
      if (result.response.status === 400) {
        dispatch(getAdOneFail(result.response.data.message));
      } else {
        dispatch(getAdOneFail(result.message));
      }
    } catch (e: any) {
      dispatch(getAdOneFail(e.message));
    }
  };

  useLayoutEffect(() => {
    getProductOne();
  }, [id]);

  return (
    <AddingPage
      update
      isAd={isAd}
      loadingData={isLoading}
      sendData={sendData}
      isAdmin={isAdmin}
      ad={ad}
      error={error}
    />
  );
};

export default UpdateAdContainer;
