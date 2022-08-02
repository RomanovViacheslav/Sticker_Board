/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Form, Input, message, Radio, RadioChangeEvent, Select, Upload } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import UserMenu from '../../common/UserMenu';
import style from './AddingPage.module.scss';
import { useAppSelector } from '../../../hooks/redux-hooks';

const AddingPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const [admin, setAdmin] = useState(true);
  const category = [
    'Автомобили',
    'Аксессуары',
    'Одежда',
    'Мебель',
    'Спорт',
    'Техника',
    'Товары для дома',
  ];
  const { Dragger } = Upload;
  const navigate = useNavigate();
  const [titleProduct, setTitleProduct] = useState('Название');
  const [form] = Form.useForm();
  const handlerLink = () => {
    navigate(-1);
  };

  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleProduct(event.target.value);
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/WebP' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('Вы можете загружать только JPEG, JPG, PNG, WebP файлы!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Фото не может быть больше 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = (value: any) => {
    console.log(value);
  };

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        <div className={style.user_menu}>
          <UserMenu ads admin={false} />
        </div>
        <div className={style.ads_wrapper}>
          <button className={style.link_back} type="button" onClick={handlerLink}>
            ← Вернуться назад
          </button>

          <div>
            <Form
              initialValues={{
                title: '',
                price: '',
                phone: '+7',
                photo: '',
                location: '',
                radio: '',
                options: 'Выберите категорию',
                description: '',
              }}
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={(value) => {
                onFinish(value);
              }}>
              <div className={style.ads_form_top}>
                <span>{titleProduct}</span>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </div>

              <div className={style.ads_form_wrap}>
                <FormItem
                  className={style.form_title}
                  name="title"
                  label="Название товара"
                  rules={[
                    {
                      required: true,
                      message: 'Поле должно быть заполнено',
                    },
                    { max: 50, message: 'Название должно быть не более 50 символов' },
                  ]}>
                  <Input
                    placeholder="Введите наименование"
                    id="title_product"
                    className={style.form_input}
                    onChange={handler}
                  />
                </FormItem>

                <Input.Group compact className={style.form_option_price}>
                  <FormItem
                    rules={[
                      {
                        required: true,
                        message: 'Поле должно быть заполнено',
                      },
                    ]}
                    name="options"
                    label="Категория"
                    className={style.form_option}>
                    <Select>
                      {category.map((elem) => (
                        <Select.Option key={elem} value={String(elem)}>
                          {elem}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                  <FormItem
                    rules={[
                      {
                        required: true,
                        message: 'Поле должно быть заполнено',
                      },
                    ]}
                    name="price"
                    label="Стоимость"
                    className={style.form_price}>
                    <Input
                      className={style.form_input_price}
                      placeholder="00,00"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </FormItem>
                </Input.Group>

                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Поле должно быть заполнено',
                    },
                  ]}
                  name="phone"
                  label="Телефон"
                  className={style.form_title}>
                  <Input
                    style={{ width: '47.5%' }}
                    className={style.form_input}
                    onKeyPress={(event) => {
                      if (!/[0-9+-]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </FormItem>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Поле должно быть заполнено',
                    },
                  ]}
                  name="description"
                  label="Описание"
                  className={style.form_title}>
                  <TextArea
                    className={style.form_text_area}
                    placeholder="Введите текст (до 3000 символов)"
                  />
                </FormItem>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Поле должно быть заполнено',
                    },
                  ]}
                  name="photo"
                  label="Фотография"
                  className={style.form_title}>
                  <Dragger maxCount={1} beforeUpload={beforeUpload} onChange={handleChange}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Нажмите или перетащите файл в эту область, чтобы загрузить
                    </p>
                    <p className="ant-upload-hint">
                      Ограничение по объему 2 МБ, количество 1 фото, форматы: JPEG, JPG, PNG, WebP
                    </p>
                  </Dragger>
                </FormItem>

                <FormItem
                  className={style.form_title}
                  name="location"
                  label="Местоположение"
                  rules={[
                    {
                      required: true,
                      message: 'Поле должно быть заполнено',
                    },
                  ]}>
                  <Input
                    placeholder="Введите адрес"
                    id="title_product"
                    className={style.form_input}
                  />
                </FormItem>
                <div>
                  <iframe
                    width="600"
                    height="500"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9%20%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                  />
                </div>
                {admin && (
                  <FormItem name="radio" label="Публикация " className={style.form_title}>
                    <Radio.Group className={style.form_radio}>
                      <Radio value="Да"> Да </Radio>
                      <Radio value="Нет"> Нет </Radio>
                    </Radio.Group>
                  </FormItem>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddingPage;
