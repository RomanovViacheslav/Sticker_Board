import { Button, Input, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../../../hooks/redux-hooks';
import UserMenu from '../../common/UserMenu';
import style from './AdminPage.module.scss';
import Search from './Search';
import Table from './Table';

const AdminPage = () => {
  const [search, setSearch] = useState('');

  const { user } = useAppSelector((state) => state.user);
  const onSearch = () => console.log('поиск');
  const [actionMenu, setActionMenu] = useState(false);

  const data = [
    {
      key: '1',
      title: 'Чепчик',
      category: 'Одежда',
      date: '12 апреля 2022',
      publication: true,
    },
    {
      key: '2',
      title: 'Самовар',
      category: 'Товары для дома',
      date: '12 апреля 2022',
      publication: true,
    },
    {
      key: '3',
      title: 'Стиральная машина LG',
      category: 'Товары для дома',
      date: '11 апреля 2022',
      publication: true,
    },
    {
      key: '4',
      title: 'Часы Rolex',
      category: 'Аксессуары',
      date: '10 апреля 2022',
      publication: true,
    },
  ];

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
              <span>Всего:</span>
            </div>
            <Button className={style.table_button} type="primary">
              Добавить +
            </Button>
          </div>

          <Search value={search} setValue={setSearch} />
          <Table />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
