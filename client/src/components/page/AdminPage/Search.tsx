import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getAdsFilter } from '../../../store/adsSlice/adsSlice';
import style from './AdminPage.module.scss';

type SearchPropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  getProductsUser: () => void;
};

const Search = ({ value, setValue, getProductsUser }: SearchPropsType) => {
  const [focus, setFocus] = useState(true);

  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handlerClick = () => {
    getProductsUser();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getProductsUser();
      event.preventDefault();
    }
  };
  const onMouseEnterHandler = () => {
    setFocus(false);
  };
  const onMouseLeave = () => {
    setFocus(true);
  };

  const iconSearch = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <path
          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9999 21.0004L16.6499 16.6504"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
  return (
    <form className={style.search_form}>
      <input
        className={style.search_input}
        type="text"
        value={value}
        onChange={handler}
        onKeyDown={onKeyDown}
      />

      <Link
        to="#!"
        onClick={handlerClick}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeave}
        className={focus ? style.search_icon : style.search_icon_activ}>
        {iconSearch}
      </Link>
    </form>
  );
};

export default Search;
