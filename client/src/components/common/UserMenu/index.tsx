import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenuItem from './UserMenuItem';

import bulletinIcon from './icons/book.svg';
import adminIcon from './icons/grid.svg';
import exitIcon from './icons/exit.svg';
import style from './UserMenu.module.scss';
import UserMenuProfile from './UserMenuProfile';
import { userLogout } from '../../../network/user';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { loginOut } from '../../../store/loginSlice/loginSlice';
import { userClear } from '../../../store/userSlice/userSlice';

type UserMenuPropsType = {
  admin: boolean;
  id?: number;
};

const UserMenu = ({ admin, id }: UserMenuPropsType) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  // const [admin, setAdmin] = useState(true);

  const [userName, setUserName] = useState('');
  const dataUser: any = user;

  useEffect(() => {
    setUserName(`${dataUser.Name} ${dataUser.surName}`);
  });

  const logOut = async () => {
    await userLogout();
    dispatch(userClear());
    // dispatch(loginOut());
    localStorage.removeItem('accessToken');
  };

  return (
    <ul className={style.user_menu}>
      <UserMenuProfile userName={userName} />
      <UserMenuItem to="/" svg={bulletinIcon} title="Мои объявления" />
      {admin && <UserMenuItem to={`admin/${id}`} svg={adminIcon} title="Админ Панель" />}
      <UserMenuItem to="/" svg={exitIcon} title="Выход" onClick={logOut} />
    </ul>
  );
};

export default UserMenu;
