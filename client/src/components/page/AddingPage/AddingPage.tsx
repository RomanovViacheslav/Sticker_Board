import { Button } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../common/UserMenu';
import style from './AddingPage.module.scss';

const AddingPage = () => {
  const navigate = useNavigate();
  const [titleProduct, setTitleProduct] = useState('Название');
  const handlerLink = () => {
    navigate(-1);
  };
  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <div className={style.user_menu}>
          <UserMenu ads admin={false} />
        </div>
        <div className={style.ads_wrapper}>
          <button className={style.link_back} type="button" onClick={handlerLink}>
            ← Вернуться назад
          </button>

          <div className={style.ads_form_top}>
            <span>{titleProduct}</span>
            <Button type="primary">Сохранить</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddingPage;
