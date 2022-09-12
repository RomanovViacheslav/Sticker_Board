import React from 'react';
import style from './NotFoundPage.module.scss';
import banner from './img/cat.png';

const NotFoundPage = () => (
  <main className={style.content}>
    <div className={style.content__container}>
      <div className={style.content__text}>
        <span className={style.content__text1}>Упс! Кажется, на эту страницу прилег котик</span>
        <span className={style.content__text2}>Ошибка 404</span>
        <span className={style.content__text3}>Мы уже разбираемся, почему так получилось, скоро все починим.</span>{' '}
      </div>
      <img className={style.content_banner_img} src={banner} alt="Banner" />
    </div>
  </main>
);

export default NotFoundPage;
