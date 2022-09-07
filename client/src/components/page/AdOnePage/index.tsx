/* eslint-disable jsx-a11y/iframe-has-title */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhoto } from '../../../network/ads';
import ButtonComponent from '../../common/Button';
import style from './AdOnePage.module.scss';

type AdOnePropsType = {
  isLoading: boolean;
  ad: any;
  isAd: boolean;
  error:string
};

const AdOnePage = ({ isLoading, ad, isAd, error }: AdOnePropsType) => {
  const [phoneNum, setPhoneNum] = useState(false);
  const navigate = useNavigate();
  const handlerLink = () => {
    navigate(-1);
  };

  const createNumber = (numbers: string) => {
    let format = 'xx (xxx) xx-xx-xxx';
    const numberArr = numbers.split('');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberArr.length; i++) {
      format = format.replace('x', numberArr[i]);
    }

    return format;
  };

  const getDate = (data: string) => data.split('T')[0].split('-').reverse().join(' - ');

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        {isLoading ? (
          <Spin size="large" className={style.spin} />
        ) : isAd ? (
          <div className={style.product_page}>
            <button className={style.link_back} type="button" onClick={handlerLink}>
              <ArrowLeftOutlined className={style.link_back_icon} />
            </button>
            <div className={style.product_wrapper}>
              <div className={style.product_column_left}>
                <span className={style.product_date}>{getDate(ad.createdAt)}</span>
                <h2 className={style.product_title}>{ad.title}</h2>
                <img className={style.product_img} src={ad.image} alt={ad.title} />
                <div className={style.product_description}>
                  <span className={style.product_subtitle}>Описание:</span>
                  <p>{ad.description}</p>
                </div>
                <span className={style.product_subtitle}>
                  Местоположение: <span className={style.product_location}>{ad.location}</span>
                </span>
                <div className={style.product_map}>
                  <iframe
                    width="100%"
                    height="325"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9%20%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                  />
                </div>
              </div>
              <div className={style.product_column_right}>
                <span className={style.product_price}>{ad.price} P</span>
                {phoneNum ? (
                  <span className={style.product_phone}>{createNumber(ad.phone)}</span>
                ) : (
                  <Button
                    className={style.product_phone_button}
                    onClick={() => setPhoneNum(true)}
                    type="primary">
                    Показать номер
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h1>{error}☹</h1>
        )}
      </div>
    </main>
  );
};

export default AdOnePage;
