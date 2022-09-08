import React from 'react';
import { Spin } from 'antd';
import style from './MainPage.module.scss';
import banner from './IMG/MainBanner.png';
import Card from '../../common/Card';

type MainPagePropsType = {
  ads: any[];
  isLoading: boolean;
};

const MainPage = ({ ads, isLoading }: MainPagePropsType) => (
  <main className={style.content}>
    <div className={style.content__container}>
      <div className={style.main_banner}>
        <div className={style.banner__container}>
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
      <div className={style.card_wrapper}>
        {isLoading ? (
          <Spin />
        ) : (
          ads.map((elem) => (
            <Card
              key={elem.id}
              id={elem.id}
              category={elem.category}
              title={elem.title}
              price={elem.price}
              description={elem.description}
              date={elem.createdAt}
              photo={elem.photo}
            />
          ))
        )}
      </div>
    </div>
  </main>
);

export default MainPage;
