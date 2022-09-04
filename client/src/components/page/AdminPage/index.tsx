/* eslint-disable max-len */
import { Button, Pagination, PaginationProps, Space, Spin } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getAdsSuccess } from '../../../store/adsSlice/adsSlice';
import Modal from '../../common/Modal/Modal';
import UserMenu from '../../common/UserMenu';
import style from './AdminPage.module.scss';
import Filter from './Filter';
import Search from './Search';
import Table from './Table';

type AdminPropsType = {
  getProductsUser: () => void;
  count: string;
  onChange: PaginationProps['onChange'];
  limit: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setDeleteIdAd: React.Dispatch<React.SetStateAction<string>>;
};

const AdminPage = ({
  getProductsUser,
  count,
  onChange,
  limit,
  value,
  setValue,
  setDeleteIdAd,
}: AdminPropsType) => {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate('/adding');
  };

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <div className={style.user_menu}>
          <UserMenu ads admin={false} />
        </div>
        <div className={style.table_wrapper}>
          <div className={style.table_top}>
            <div className={style.table_title}>
              <h2>Объявления </h2>
              <span>Всего:{count}</span>
            </div>
            <Button onClick={handlerButton} className={style.table_button} type="primary">
              Добавить +
            </Button>
          </div>
          <div className={style.table_search}>
            <div className={style.filter_container}>
              <Search getProductsUser={getProductsUser} value={value} setValue={setValue} />
              <Filter getProductsUser={getProductsUser} setValue={setValue} />
            </div>
            <div>
              <Pagination
                simple
                onChange={onChange}
                total={Number(count)}
                pageSize={Number(limit)}
                defaultCurrent={1}
              />
            </div>
          </div>
          <Table setDeleteIdAd={setDeleteIdAd} />
        </div>
      </div>
    </main>
  );
};
export default AdminPage;
