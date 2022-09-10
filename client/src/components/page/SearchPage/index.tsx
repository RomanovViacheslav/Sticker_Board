import { Pagination, PaginationProps, Spin } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './SearchPage.module.scss';

type SearchPagePropsType = {
  adsData: any[];
  isLoading: boolean;
  count: string;
  onChange: PaginationProps['onChange'];
};

const SearchPage = ({ adsData, isLoading, count, onChange }: SearchPagePropsType) => {
  const getDate = (data: string) => data.split('T')[0].split('-').reverse().join(' - ');

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <span className={style.search__count}>Найдено: {count}</span>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          adsData.map((elem) => (
            <Link to={`/product/${elem.id}`} key={elem.id} className={style.search__wrapper}>
              <span className={style.search__elem_title}>{elem.title}</span>
              <p className={style.search__elem_description}>{elem.description}</p>
              <span className={style.search__elem_date}>{getDate(elem.createdAt)}</span>
            </Link>
          ))
        )}
        <Pagination
          className={style.search__pagination}
          onChange={onChange}
          total={Number(count)}
          pageSize={6}
          defaultCurrent={1}
        />
      </div>
    </main>
  );
};

export default SearchPage;
