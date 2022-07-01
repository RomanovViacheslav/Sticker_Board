import React from 'react';

type ButtonPropsType = {
  text: string;
  className: string
};

const ButtonComponent = ({ text, className }: ButtonPropsType) => <button className={className} type="button">{text}</button>;

export default ButtonComponent;
