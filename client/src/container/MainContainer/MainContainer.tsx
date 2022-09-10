import React, { useEffect, useLayoutEffect, useState } from 'react';
import MainPage from '../../components/page/MainPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAdsPublic } from '../../network/ads';
import {
  adsPublicClear,
  adsPublicSuccess,
  getAdsPublicFail,
} from '../../store/adsPublicSlice/adsPublicSlice';
import { getAdsFail, getAdsPending, getAdsSuccess } from '../../store/adsSlice/adsSlice';

const MainContainer = () => {
  type dataType = {
    category: string;
    createdAt: string;
    description: string;
    id: number;
    location: string;
    phone: string;
    photo: string;
    price: number;
    published: string;
    title: string;
    updatedAt: string;
    userId: number;
  };

  type arrDataType = {
    ad: dataType[];
  };

  const { adsPublic } = useAppSelector((state) => state.adsPublic);
  const [count, setCount] = useState('');
  const [page, setPage] = useState('1');

  const [category, setCategory] = useState('');
  const [data, setData] = useState<arrDataType[]>([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useAppDispatch();

  const getProductPublic = async () => {
    try {
      const result = await getAdsPublic('9', page, category, '');
      console.log(result);

      if (result) {
        dispatch(adsPublicSuccess(result.rows));
        setData([...data, ...result.rows]);
        setCount(result.count);
      }
    } catch (error: any) {
      dispatch(getAdsPublicFail(error.message));
    }
  };

  useLayoutEffect(() => {
    getProductPublic();
  }, [page, fetching]);

  useEffect(() => {
    setPage('1');

    setData([]);
    setFetching(!fetching);
  }, [category]);

  const clickHandler = () => {
    setPage(`${Number(page) + 1}`);
  };
  const buttonDis = Math.ceil(Number(count) / 9) - Number(page) < 1;

  return (
    <MainPage
      buttonDis={buttonDis}
      category={category}
      setCategory={setCategory}
      ads={data}
      isLoading={false}
      clickHandler={clickHandler}
    />
  );
};

export default MainContainer;
