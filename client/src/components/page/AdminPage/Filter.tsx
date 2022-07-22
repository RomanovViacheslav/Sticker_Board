/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'antd';
import { ChangeEventExtra } from 'rc-tree-select/lib/TreeSelect';
import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getAdsFilter, getAdsSuccess } from '../../../store/adsSlice/adsSlice';
import style from './AdminPage.module.scss';

type FilterPropsType = {
  dataAds: any[];
};

const Filter = () => {
  const [menuFilter, setMenuFilter] = useState(false);
  const { ads } = useAppSelector((state) => state.ads);
  const dispatch = useAppDispatch();
  const [checkedPublication, setCheckedPublication] = useState<any[]>([]);
  const [checkedСategory, setCheckedСategory] = useState<any[]>([]);

  const uniqCategory = Array.from(new Set(ads.map((el) => el.category)));
  const uniqPublication = Array.from(new Set(ads.map((el) => el.publication)));

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedListPubl = [...checkedPublication];
    let updatedListCateg = [...checkedСategory];

    if (event.target.checked) {
      if (event.target.value === 'Да' || event.target.value === 'Нет') {
        updatedListPubl = [...checkedPublication, event.target.value];
      } else {
        updatedListCateg = [...checkedСategory, event.target.value];
      }
    }
    if (!event.target.checked) {
      if (event.target.value === 'Да' || event.target.value === 'Нет') {
        updatedListPubl.splice(checkedPublication.indexOf(event.target.value), 1);
      } else {
        updatedListCateg.splice(checkedСategory.indexOf(event.target.value), 1);
      }
    }
    setCheckedСategory(updatedListCateg);
    setCheckedPublication(updatedListPubl);
  };

  const dataAds = [
    {
      key: '1',
      title: 'Чепчик',
      category: 'Одежда',
      date: '12 апреля 2022',
      publication: 'Да',
    },
    {
      key: '2',
      title: 'Самовар',
      category: 'Товары для дома',
      date: '12 апреля 2022',
      publication: 'Да',
    },
    {
      key: '3',
      title: 'Стиральная машина LG',
      category: 'Товары для дома',
      date: '11 апреля 2022',
      publication: 'Да',
    },
    {
      key: '4',
      title: 'Часы Rolex',
      category: 'Аксессуары',
      date: '10 апреля 2022',
      publication: 'Нет',
    },
  ];
  const resetFilter = () => {
    setCheckedСategory([]);
    setCheckedPublication([]);
    dispatch(getAdsSuccess(dataAds));
  };

  const applyFilter = () => {
    const filterCategory = ads.filter((item) => checkedСategory.includes(item.category));
    const filterPublic = ads.filter((item) => checkedPublication.includes(item.publication));
    let filterData: any = [];

    if (checkedPublication.length === 0) {
      filterData = filterCategory;
    } else if (checkedСategory.length === 0 && checkedPublication.length > 0) {
      filterData = filterPublic;
    } else {
      filterData = filterCategory.filter((item) => checkedPublication.includes(item.publication));
    }
    dispatch(getAdsFilter(filterData));
  };

  const handleClick = () => {
    setMenuFilter(!menuFilter);
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
                  <input
                    type="checkbox"
                    id={el}
                    checked={checkedСategory.includes(el)}
                    value={el}
                    onChange={handleCheckbox}
                  />
                  <label htmlFor={el}>{el}</label>
                </div>
              ))}
            </div>
            <div className={style.filter_menu_column}>
              <span className={style.filter_menu_span}>Опубликовано</span>
              {uniqPublication.map((el) => (
                <div className={style.filter_checkbox}>
                  <input
                    type="checkbox"
                    id={el}
                    value={el}
                    checked={checkedPublication.includes(el)}
                    onChange={handleCheckbox}
                  />
                  <label htmlFor={el}>{el}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={style.filter_menu_buttons}>
            <Button onClick={applyFilter} className={style.filter_menu_buttons_1} type="primary">
              Применить
            </Button>
            <Button onClick={resetFilter} className={style.filter_menu_buttons_2}>
              Сбросить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
