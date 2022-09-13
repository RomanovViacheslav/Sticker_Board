import { log } from 'console';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { getValue } from '../../../store/searchValueSlice/searchValueSlice';

import style from './Search.module.scss';

type SearchPropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ value, setValue }: SearchPropsType) => {
  const [focus, setFocus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onFocus = () => {
    setFocus(false);
  };
  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setFocus(true);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      dispatch(getValue(value));
      navigate('/search', { state: value });
    }
  };

  const iconSearch = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <path
          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9999 21.0004L16.6499 16.6504"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
  return (
    <form className={style.search_form}>
      <input
        className={style.search_input}
        type="text"
        value={value}
        onChange={handler}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />

      <div className={focus ? style.search_icon : style.search_icon_activ}>{iconSearch}</div>
      <button
        className={style.search_button}
        type="button"
        onClick={() => {
          dispatch(getValue(value));
          navigate('/search', { state: value });
        }}>
        Искать
      </button>
    </form>
  );
};

export default Search;
