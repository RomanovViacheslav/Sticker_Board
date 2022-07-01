import React from 'react';
import { Link } from 'react-router-dom';
import style from './UserMenuItem.module.scss';

type UserMenuItemPropsType = {
  svg: string;
  title: string;
  to: string;
  onClick?: () => void;
};

const UserMenuItem = ({ svg, title, to, onClick }: UserMenuItemPropsType) => (
  <li>
    <Link to={to} className={style.user_menu_item} onClick={onClick}>
      <img src={svg} alt="" />
      <span>{title}</span>
    </Link>
  </li>
);

export default UserMenuItem;
