import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.scss';

type CardPropsType = {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  date: string;
  photo: string;
};

const Card = ({ id, category, title, description, price, date, photo }: CardPropsType) => {
  const maxText = (text: string) => (text.length > 128 ? `${text.slice(0, 128).trim()}...` : text);
  const getDate = (data: string) => data.split('T')[0].split('-').reverse().join(' - ');
  return (
    <div className={style.card}>
      <Link to={`product/${id}`}>
        <div className={style.card__header}>
          <img
            className={style.card__img}
            src={`http://localhost:3001/photo/${photo}`}
            alt={title}
          />
          <div className={style.card__category}>{category}</div>
        </div>

        <div className={style.card__content}>
          <span className={style.card__title}>{title}</span>
          <p className={style.card__description}>{maxText(description)}</p>
          <span className={style.card__price}>{price}</span>
          <div className={style.card__bottom}>
            <span className={style.card__date}>{getDate(date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
