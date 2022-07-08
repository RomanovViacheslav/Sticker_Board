import { Form, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../common/Form/FormWrapper';
import style from './AuthPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { loginFail, loginPending, loginSuccess } from '../../../store/loginSlice/loginSlice';
import { userLogin } from '../../../network/user';
import getUserProfile from '../../../store/userSlice/userActions';

const AuthPage = () => {
  const [errorAPI, setErrorAPI] = useState(false);
  const { isLoading, isAuth, error } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <FormWrapper title="Hello, world!" subtitle="Пройдите авторизацию">
          <Form
            onFinish={async (values) => {
              const { email, password } = values;
              dispatch(loginPending());
              try {
                const response = await userLogin(email, password);

                if (response.status === 'error') {
                  dispatch(loginFail(response.message));
                  setErrorAPI(true);
                } else if (response === 'Network Error') {
                  dispatch(loginFail('Ошибка сервера'));
                  setErrorAPI(true);
                } else {
                  dispatch(loginSuccess());
                  dispatch(getUserProfile());
                  navigate('/');
                }
              } catch (e: unknown) {
                dispatch(loginFail(e));
                setErrorAPI(true);
              }
            }}
            className={style.form}>
            <FormItem
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Введите Ваш email',
                },
              ]}>
              <Input placeholder="Email" id="email" className={style.form_input} />
            </FormItem>

            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Введите Ваш пароль',
                },
              ]}
              hasFeedback>
              <Input.Password placeholder="Пароль" className={style.form_input} />
            </FormItem>
            {errorAPI && <span className={style.form_input_error}>{error}</span>}
            <FormItem>
              <Button disabled={isLoading} type="primary" htmlType="submit">
                Войти
              </Button>
            </FormItem>
          </Form>
        </FormWrapper>
      </div>
    </main>
  );
};

export default AuthPage;
