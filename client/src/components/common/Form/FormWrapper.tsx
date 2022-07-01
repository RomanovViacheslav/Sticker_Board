import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './FormWrapper.module.scss';

type FormWrapperPropsType = {
  title: string;
  children: React.ReactNode;
  subtitle: string;
};

const FormWrapper = ({ title, children, subtitle }: FormWrapperPropsType) => {
  const activeClassName = `${style.form_link_activ}`;
  const className = `${style.form_link_item}`;

  const setActiv = ({ isActive }: any) => (isActive ? activeClassName : className);

  return (
    <div className={style.form}>
      <h2>{title}</h2>
      <p className={style.form_subtitle}>{subtitle}</p>
      <div className={style.form_link}>
        <NavLink className={setActiv} to="/reg">
          Регистрация
        </NavLink>
        <NavLink className={setActiv} to="/auth">
          Авторизация
        </NavLink>
      </div>

      <div className={style.form__input}>{children}</div>
    </div>
  );
};

export default FormWrapper;
