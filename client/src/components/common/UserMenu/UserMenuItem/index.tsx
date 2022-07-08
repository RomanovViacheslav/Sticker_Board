import React from 'react';
import { Link } from 'react-router-dom';
import style from './UserMenuItem.module.scss';

type UserMenuItemPropsType = {
  svg: string;
  title: string;
  to: string;
  onClick?: () => void;
  ads?: boolean;
};

const UserMenuItem = ({ svg, title, to, onClick, ads }: UserMenuItemPropsType) => (
  <li>
    <Link to={to} className={!ads ? style.user_menu_item : `${style.user_menu_item} ${style.user_menu_activ}`} onClick={onClick}>
      <img src={svg} alt="" />
      <span>{title}</span>
    </Link>
  </li>
);

export default UserMenuItem;
