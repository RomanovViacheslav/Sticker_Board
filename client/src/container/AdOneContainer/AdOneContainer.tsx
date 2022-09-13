import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdOnePage from '../../components/page/AdOnePage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAdOne } from '../../network/ads';
import { getAdOneFail, getAdOnePending, getAdOneSuccess } from '../../store/adOneSlice/adOneSlice';

const AdOneContainer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, ad, isAd, error } = useAppSelector((state) => state.adOne);
  const getProductOne = async () => {
    try {
      dispatch(getAdOnePending());
      const result = await getAdOne(id);

      if (result.status === 200) {
        const dataAd = result.data;
        const image = `http://localhost:3001/photo/${dataAd.photo} `;
        dataAd.image = image;

        dispatch(getAdOneSuccess(dataAd));
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

  useEffect(() => {
    getProductOne();
  }, [id]);
  return <AdOnePage isAd={isAd} isLoading={isLoading} ad={ad} error={error} />;
};

export default AdOneContainer;
