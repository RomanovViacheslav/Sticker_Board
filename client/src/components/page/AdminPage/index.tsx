import { Button, Spin } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getAdsSuccess } from '../../../store/adsSlice/adsSlice';
import UserMenu from '../../common/UserMenu';
import style from './AdminPage.module.scss';
import Filter from './Filter';
import Search from './Search';
import Table from './Table';

type AdminPropsType = {
  getProductsUser: () => void;
};

const AdminPage = ({ getProductsUser }: AdminPropsType) => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const { filterAds } = useAppSelector((state) => state.ads);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

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
              <span>Всего:{filterAds.length}</span>
            </div>
            <Button onClick={handlerButton} className={style.table_button} type="primary">
              Добавить +
            </Button>
          </div>
          <div className={style.table_search}>
            <Search value={search} setValue={setSearch} />
            <Filter getProductsUser={getProductsUser} />
          </div>

          <Table />
        </div>
      </div>
    </main>
  );
};
export default AdminPage;
