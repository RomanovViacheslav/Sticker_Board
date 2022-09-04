import { Alert, Button, Space } from 'antd';
import React from 'react';
import style from './Modale.module.scss';

type ModalPropsType = {
  inform: boolean;
  textAlert: string;
  textOk?: string;
  textNo?: string;
  handleClickOk?: () => void;
  handleClickNo?: () => void;
};

const Modal = ({
  inform,
  textAlert,
  textOk,
  textNo,
  handleClickOk,
  handleClickNo,
}: ModalPropsType) => (
  <div className={style.modal_container}>
    <Alert
      className={style.modal_content}
      description={textAlert}
      action={
        !inform ? (
          <Space direction="horizontal">
            <Button
              className={style.modal_button}
              onClick={handleClickOk}
              size="small"
              type="primary">
              {textOk}
            </Button>
            <Button
              className={style.modal_button}
              onClick={handleClickNo}
              size="small"
              danger
              type="ghost">
              {textNo}
            </Button>
          </Space>
        ) : (
          <Space direction="horizontal">
            <Button className={style.modal_button} size="small" type="primary">
              ОК
            </Button>
          </Space>
        )
      }
      closable
    />
  </div>
);

export default Modal;
