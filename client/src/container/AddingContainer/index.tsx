import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddingPage from '../../components/page/AddingPage/AddingPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createAd } from '../../network/ads';
import {
  createAdError,
  createAdPending,
  createAdSuccess,
} from '../../store/createAd/createAdSlice';

const AddingContainer = () => {
  const dispatch = useAppDispatch();
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
      const result = await createAd(
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
    } catch (error: any) {
      dispatch(createAdError(error));
    }
  };

  const ad = {
    title: '',
    price: '',
    phone: '+7',
    photo: '',
    location: '',
    published: 'Нет',
    category: null,
    description: '',
  };
  return (
    <AddingPage
      update={false}
      isAd
      loadingData={false}
      isAdmin={isAdmin}
      sendData={sendData}
      ad={ad}
    />
  );
};

export default AddingContainer;
