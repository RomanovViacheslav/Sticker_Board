import React from 'react';
import style from './MainPage.module.scss';
import banner from './IMG/MainBanner.png';

const MainPage = () => (
  <div className={style.main_banner}>
    <div className={style.content__container}>
      <div className={style.main_baner_text}>
        <h1 className={style.main_baner_text_title}>Доска объявлений</h1>
        <p className={style.main_baner_text_subtitle}>
          Находи тысячи разнообразных товаров и услуг
          <br /> от продавцов со всей страны.
          <br /> Безопасные расчеты. Удобный сервис доставки
        </p>
      </div>
      <img className={style.main_baner_img} src={banner} alt="" />
    </div>
  </div>
);

export default MainPage;
