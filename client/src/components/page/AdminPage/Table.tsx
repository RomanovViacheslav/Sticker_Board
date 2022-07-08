import React from 'react';
import style from './AdminPage.module.scss';

const Table = () => (
  <div className={style.table}>
    <div className={style.table_row}>
      <div className={style.table_name}>Название объявления</div>
      <div className={style.table_category}>Категория</div>
      <div className={style.table_date}>Дата публикации</div>
      <div className={style.table_publication}>Публикация</div>
      <div className={style.table_menu} />
    </div>
  </div>
);

export default Table;
