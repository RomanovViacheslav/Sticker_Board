import React from 'react';

type ButtonPropsType = {
  text: string;
  className: string;
  onClick: () => void;
};

const ButtonComponent = ({ text, className, onClick }: ButtonPropsType) => (
  <button onClick={onClick} className={className} type="button">
    {text}
  </button>
);

export default ButtonComponent;
