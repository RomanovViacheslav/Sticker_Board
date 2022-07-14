/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'antd';
import React, { useState } from 'react';
import style from './AdminPage.module.scss';

type FilterPropsType = {
  dataAds: any[];
};

const Filter = ({ dataAds }: FilterPropsType) => {
  const [menuFilter, setMenuFilter] = useState(false);

  const uniqCategory = Array.from(new Set(dataAds.map((el) => el.category)));
  const uniqPublication = Array.from(new Set(dataAds.map((el) => el.publication)));
  const handleClick = () => {
    setMenuFilter(true);
  };
  const filterIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.19995 12L16.7999 12"
        stroke="#2C2D2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.6001 6L20.4001 6"
        stroke="#2C2D2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 18L13.2001 18"
        stroke="#2C2D2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div className={style.filter}>
      <Button className={style.filter_button} onClick={handleClick}>
        Фильтровать <div>{filterIcon}</div>
      </Button>

      {menuFilter && (
        <div className={style.filter_menu}>
          <div className={style.filter_menu_checkboxes}>
            <div className={style.filter_menu_column}>
              <span className={style.filter_menu_span}>Категория</span>
              {uniqCategory.map((el) => (
                <div className={style.filter_checkbox}>
                  <input type="checkbox" id={el} />
                  <label htmlFor={el}>{el}</label>
                </div>
              ))}
            </div>
            <div className={style.filter_menu_column}>
              <span className={style.filter_menu_span}>Опубликовано</span>
              {uniqPublication.map((el) => (
                <div className={style.filter_checkbox}>
                  <input type="checkbox" id={el} />
                  <label htmlFor={el}>{el}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={style.filter_menu_buttons}>
            <Button className={style.filter_menu_buttons_1} type="primary">Применить</Button>
            <Button className={style.filter_menu_buttons_2}>Сбросить</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
