import React, { useEffect, useState } from 'react';
import MainPage from '../../components/page/MainPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAdsPublic } from '../../network/ads';
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

  const { ads, isLoading } = useAppSelector((state) => state.ads);
  const [count, setCount] = useState('');
  const [page, setPage] = useState('1');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState('9');
  const [category, setCategory] = useState('');
  const [data, setData] = useState<arrDataType[]>(ads);
  const dispatch = useAppDispatch();

  const getProductPublic = async () => {
    try {
      dispatch(getAdsPending());
      const result = await getAdsPublic(limit, page, category, search);
      console.log(result);

      if (result) {
        dispatch(getAdsSuccess(result.rows));

        setCount(result.count);
      }
    } catch (error: any) {
      dispatch(getAdsFail(error.message));
    }
  };
  console.log(ads);

  useEffect(() => {
    getProductPublic();
  }, [page]);

  return <MainPage ads={ads} isLoading={isLoading} />;
};

export default MainContainer;
