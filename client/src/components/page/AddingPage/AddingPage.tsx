/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Form, Input, Radio, RadioChangeEvent, Select, Spin, Upload } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { log } from 'console';
import UserMenu from '../../common/UserMenu';
import style from './AddingPage.module.scss';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { createAd } from '../../../network/ads';

type AddingPropsType = {
  isAdmin: boolean;
  sendData: (
    title: string,
    price: string,
    phone: string,
    file: any,
    location: string,
    category: string,
    description: string,
    published?: string
  ) => void;
  ad?: any;
  loadingData?: boolean;
  isAd: boolean;
  error?: string;
  update?: boolean;
};

const AddingPage = ({
  isAdmin,
  sendData,
  ad,
  loadingData,
  isAd,
  error,
  update,
}: AddingPropsType) => {
  const category = [
    'Автомобили',
    'Аксессуары',
    'Одежда',
    'Мебель',
    'Спорт',
    'Техника',
    'Товары для дома',
  ];

  const navigate = useNavigate();
  const [titleProduct, setTitleProduct] = useState('Название');
  const [form] = Form.useForm();
  const handlerLink = () => {
    navigate(-1);
  };
  const { isLoading, message, status } = useAppSelector((state) => state.createAd);
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleProduct(event.target.value);
  };

  const onFinish = async (value: any) => {
    const { title, price, phone, photo, location, published, options, description } = value;
    const { file } = photo;

    sendData(title, price, phone, file, location, options, description, published);
  };

  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: ad.photo,
      status: 'done',
      url: `${process.env.REACT_APP_API_URL}photo/${ad.photo}`,
      thumbUrl: `${process.env.REACT_APP_API_URL}photo/${ad.photo}`,
    },
  ];

  return (
    <main className={style.content}>
      <div className={style.content__container}>
        {loadingData ? (
          <Spin />
        ) : isAd ? (
          <>
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
                    title: ad.title,
                    price: ad.price,
                    phone: ad.phone,
                    photo: ad.photo,
                    location: ad.location,
                    published: ad.published,
                    options: ad.category,
                    description: ad.description,
                  }}
                  form={form}
                  layout="vertical"
                  autoComplete="off"
                  onFinish={async (value) => {
                    await onFinish(value);
                  }}>
                  <div className={style.ads_form_top}>
                    <span>{titleProduct}</span>
                    <Button disabled={isLoading} type="primary" htmlType="submit">
                      Сохранить
                    </Button>
                  </div>
                  {status === 'error' && <span className={style.form_input_error}>{message}</span>}
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
                        <Select placeholder="Выберите категорию">
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
                        { max: 255, message: 'Название должно быть не более 255 символов' },
                      ]}
                      name="description"
                      label="Описание"
                      className={style.form_title}>
                      <TextArea
                        className={style.form_text_area}
                        placeholder="Введите текст (до 255 символов)"
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
                      <Upload.Dragger
                        maxCount={1}
                        listType="picture"
                        action="http://localhost:3000/adding"
                        accept=".png,.jpg,.jpeg,.webp"
                        defaultFileList={update ? [...fileList] : []}
                        beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">{/* <InboxOutlined /> */}</p>
                        <p className="ant-upload-text">
                          Нажмите или перетащите файл в эту область, чтобы загрузить
                        </p>
                        <p className="ant-upload-hint">
                          Ограничение по объему 2 МБ, количество 1 фото, форматы: JPEG, JPG, PNG,
                          WebP
                        </p>
                      </Upload.Dragger>
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
                    {isAdmin && (
                      <FormItem name="published" label="Публикация " className={style.form_title}>
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
          </>
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </main>
  );
};

export default AddingPage;
