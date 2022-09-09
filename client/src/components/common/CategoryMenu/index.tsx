import React, { useState } from 'react';
import style from './CategoryMenu.module.scss';

type CategoryMenuPropsType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryMenu = ({ category, setCategory }: CategoryMenuPropsType) => {
  const [active, setActive] = useState(false);

  const categoryData = [
    'Автомобили',
    'Аксессуары',
    'Мебель',
    'Одежда',
    'Спорт',
    'Техника',
    'Товары для дома',
  ];

  const handleClick = (e: string) => {
    setActive(true);
    setCategory(e);
  };

  return (
    <ul className={style.menu}>
      <li>
        <button className={style.menu_main_elem} type="button" onClick={() => handleClick('')}>
          Вся доска
        </button>
      </li>
      {categoryData.map((elem) => (
        <li key={elem}>
          <button
            className={
              category === elem ? `${style.menu_elem} ${style.menu_elem_active}` : style.menu_elem
            }
            type="button"
            onClick={() => handleClick(elem)}>
            {elem}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryMenu;
