import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './UserMenuProfile.module.scss';

type UserMenuProfilePropsType = {
  userName: string;
};

const UserMenuProfile = ({ userName }: UserMenuProfilePropsType) => {
  const makeAvatar = () => {
    if (userName === '') {
      // eslint-disable-next-line no-param-reassign
      userName = 'No Name';
    }
    const initial = userName.split(' ');
    const avatar = initial[0][0] + initial[1][0];

    return avatar.toUpperCase();
  };

  return (
    <li>
      <Link to="/" className={style.user_menu_profile}>
        <div className={style.avatar_circle}>
          <p>{makeAvatar()}</p>
        </div>
        <div />
        <span>{userName}</span>
      </Link>
    </li>
  );
};

export default UserMenuProfile;
