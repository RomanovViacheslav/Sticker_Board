import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { ChangeEvent, useEffect, useState } from 'react';

import FormWrapper from '../../common/Form/FormWrapper';

import style from './RegPage.module.scss';

type RegPagePropsType = {
  errorAPI: boolean;
  sendData: (Name: string, surName: string, email: string, password: string) => void;
  message: string;
  isLoading: boolean;
};

const RegPage = ({ sendData, errorAPI, message, isLoading }: RegPagePropsType) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { Name, surName, email, password } = values;

    sendData(Name, surName, email, password);
  };

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <FormWrapper title="Hello, world!" subtitle="Создайте аккаунт">
          <Form
            onFieldsChange={() => {
              const actualFieldValues = form.getFieldsValue();
              const { Name, surName, email, password, confirm, agreement } = actualFieldValues;

              const anyError = form.getFieldsError().some((field) => field.errors.length > 0);

              if (Name && password && surName && email && confirm && agreement && !anyError) {
                setButtonDisabled(false);
              } else {
                setButtonDisabled(true);
              }
            }}
            className={style.form}
            form={form}
            onFinish={async (values) => {
              await onFinish(values);
            }}>
            <FormItem
              name="Name"
              rules={[
                { required: true, message: 'Заполните обязательное поле', whitespace: true },
                { max: 25, message: 'Имя должно быть не более 25 символов' },
              ]}>
              <Input placeholder="Имя" className={style.form_input} />
            </FormItem>
            <FormItem
              name="surName"
              rules={[
                { required: true, message: 'Заполните обязательное поле', whitespace: true },
                { max: 25, message: 'Фамилия должна быть не более 25 символов' },
              ]}>
              <Input placeholder="Фамилия" className={style.form_input} />
            </FormItem>

            <FormItem
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Некорректный формат адреса электронной почты',
                  whitespace: true,
                },
                {
                  required: true,
                  message: 'Заполните обязательное поле',
                },
              ]}>
              <Input placeholder="Email" className={style.form_input} />
            </FormItem>
            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Заполните обязательное поле',
                  whitespace: true,
                },
                {
                  min: 8,
                  message: 'Пароль не может быть меньше 8 символов',
                },

                {
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g,
                  message:
                    'Пароль должен состоять из символов латинского алфавита, содержать заглавные и строчные буквы, цифры',
                },
              ]}
              hasFeedback>
              <Input.Password placeholder="Пароль" className={style.form_input} />
            </FormItem>

            <FormItem
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Заполните обязательное поле',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}>
              <Input.Password placeholder="Повторите пароль" className={style.form_input} />
            </FormItem>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: 'Необходимо принять соглашение!',
                },
              ]}>
              <Checkbox>
                Принимаю условия
                <br /> <a href="/">Пользовательского соглашения</a>
              </Checkbox>
            </Form.Item>
            {errorAPI && <span className={style.form_input_error}>{message}</span>}
            <FormItem>
              <Button disabled={buttonDisabled || isLoading} type="primary" htmlType="submit">
                Создать аккаунт
              </Button>
            </FormItem>
          </Form>
        </FormWrapper>
      </div>
    </main>
  );
};

export default RegPage;
