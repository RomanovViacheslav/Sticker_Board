import { Button, Pagination, PaginationProps, Spin } from 'antd';
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
  count: string;
  onChange: PaginationProps['onChange'];
  limit: string
};

const AdminPage = ({ getProductsUser, count, onChange, limit }: AdminPropsType) => {
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
              <span>Всего:{count}</span>
            </div>
            <Button onClick={handlerButton} className={style.table_button} type="primary">
              Добавить +
            </Button>
          </div>
          <div className={style.table_search}>
            <div className={style.filter_container}>
              <Search value={search} setValue={setSearch} />
              <Filter getProductsUser={getProductsUser} />
            </div>
            <div>
              <Pagination
                simple
                onChange={onChange}
                defaultCurrent={1}
                total={Number(count)}
                pageSize={Number(limit)}
              />
            </div>
          </div>

          <Table />
        </div>
      </div>
    </main>
  );
};
export default AdminPage;
