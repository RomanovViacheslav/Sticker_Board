import React from 'react';
import { Button, Spin } from 'antd';
import style from './MainPage.module.scss';
import banner from './IMG/MainBanner.png';
import Card from '../../common/Card';
import CategoryMenu from '../../common/CategoryMenu';

type MainPagePropsType = {
  ads: any[];
  isLoading: boolean;
  clickHandler: () => void;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  buttonDis: boolean;
};

const MainPage = ({
  ads,
  isLoading,
  clickHandler,
  category,
  setCategory,
  buttonDis,
}: MainPagePropsType) => (
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
      <CategoryMenu category={category} setCategory={setCategory} />
      <h2 className={style.card_title}>Вся лента</h2>
      <div className={style.card_wrapper}>
        {isLoading ? (
          <Spin className={style.spin} />
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
      {!buttonDis && (
        <Button className={style.card_button} onClick={() => clickHandler()} type="primary">
          Загрузить еще
        </Button>
      )}
    </div>
  </main>
);

export default MainPage;
