import { PaginationProps } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchPage from '../../components/page/SearchPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAdsPublic } from '../../network/ads';
import {
  adsPublicSuccess,
  getAdsPublicFail,
  getAdsPublicPending,
} from '../../store/adsPublicSlice/adsPublicSlice';

const SearchContainer = () => {
  const { value } = useAppSelector((state) => state.searchValue);
  const { adsPublic, isLoading } = useAppSelector((state) => state.adsPublic);
  const [count, setCount] = useState('');
  const [page, setPage] = useState('1');

  const dispatch = useAppDispatch();

  const getResultSearch = async () => {
    try {
      dispatch(getAdsPublicPending());
      const result = await getAdsPublic('6', page, '', value);
      console.log(result);

      if (result) {
        dispatch(adsPublicSuccess(result.rows));

        setCount(result.count);
      }
    } catch (error: any) {
      dispatch(getAdsPublicFail(error.message));
    }
  };

  useEffect(() => {
    getResultSearch();
  }, [page, value]);

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setPage(String(pageNumber));
  };

  return <SearchPage onChange={onChange} count={count} adsData={adsPublic} isLoading={isLoading} />;
};

export default SearchContainer;
