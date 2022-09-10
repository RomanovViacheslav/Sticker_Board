import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button';

import Footer from '../Footer';

import Header from '../Header';
import Search from '../Search/Search';
import style from './PageWrapper.module.scss';

const PageWrapper = () => {
  const navigate = useNavigate();
  const handlerButton = () => {
    navigate('/adding');
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

  const [search, setSearch] = useState('');

  return (
    <div className={style.page_wrapper}>
      <Header>
        <Search value={search} setValue={setSearch} />
        <ButtonComponent
          onClick={handlerButton}
          className={style.header_button}
          text="Подать объявление"
        />
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
};
export default PageWrapper;
