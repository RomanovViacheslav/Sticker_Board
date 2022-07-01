import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hooks';
import UserMenu from '../../common/UserMenu';
import style from './AdminPage.module.scss';
import Search from './Search';

const AdminPage = () => {
  const [search, setSearch] = useState('');

  const { user } = useAppSelector((state) => state.user);
  const onSearch = () => console.log('поиск');
  const [actionMenu, setActionMenu] = useState(false);
  const getActionMenu = (record: any) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this student record?',
      okText: 'Yes',
      okType: 'danger',
    });
    console.log(record.id);
  };
  // // поиск

  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef<any>(null);

  // const handleSearch = (
  //   selectedKeys: string[],
  //   confirm: (param?: FilterConfirmProps) => void,
  //   dataIndex: any
  // ) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters: () => void) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  interface DataType {
    key: React.Key;
    title: string;
    category: string;
    date: string | Date;
    publication: boolean;
  }

  type DataIndex = keyof DataType;
  const columns: ColumnsType<DataType> = [
    {
      title: 'Название объявления',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      filterMode: 'tree',
      filterSearch: true,
      width: '50%',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
    },
    {
      title: 'Дата публикации',
      dataIndex: 'date',
      filterSearch: true,
      width: '40%',
    },
    {
      title: 'publication',
      dataIndex: 'Публикация',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (record: DataType) => (
        <div className={style.table_action}>
          <Link to="#!" className={style.table_action_svg}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="#2C2D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  stroke="#2C2D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                  stroke="#2C2D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </Link>
          <ul className={style.table_action_menu}>
            <li>
              <Link to="#!" onClick={() => getActionMenu(record)}>
                Просмотреть{' '}
              </Link>
            </li>
            <li>
              <Link to="#!">Редактировать</Link>
            </li>
            <li>
              <Link to="#!">Удалить</Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
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

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <div className={style.user_menu}>
          <UserMenu admin={false} />
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

          <Table className={style.table} columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
