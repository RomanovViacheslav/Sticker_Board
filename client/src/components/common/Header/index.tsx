import React, { Children, MouseEventHandler, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hooks';
import UserMenu from '../UserMenu';
import style from './header.module.scss';
import logo from './Logo.png';

const Header: React.FC = ({ children }) => {
  const { isLoading, user, error, isUser } = useAppSelector((state) => state.user);

  const [admin, setAdmin] = useState(false);
  const [hover, setHover] = useState(false);
  const dataUser: any = user;

  const handleMouseEnter = () => {
    setHover(true);
    if (dataUser.role === 'ADMIN') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <svg
          className={style.header_burger_menu}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.4">
            <path
              d="M3 12H21"
              stroke="#2A2F37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#2A2F37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="#2A2F37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        <Link to="/">
          <img className={style.logo} src={logo} alt="logo" />
        </Link>
        {children}
        <div className={style.header_user_menu}>
          <Link
            to={isUser ? '/' : '/auth'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={hover ? style.header_user_activ : style.header_user}>
            <svg
              className={style.header_user_svg}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#2A2F37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#2A2F37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <svg
              className={style.header_user_svg_activ}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path
                  d="M21 3L3 21"
                  stroke="#2C2D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 3L21 21"
                  stroke="#2C2D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            {isUser ? <p className={style.user__name_login}>Профиль</p> : <p>Войти</p>}
          </Link>
          {isUser && <UserMenu admin={admin} id={dataUser.id} />}
          <svg
            className={style.header_search_mobile}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#2A2F37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21.0004L16.65 16.6504"
                stroke="#2A2F37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
