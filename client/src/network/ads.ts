import axios from 'axios';

const createUrl = `${process.env.REACT_APP_API_URL}add`;
const getAdsUserUrl = `${process.env.REACT_APP_API_URL}product-user?`;
const deleteAdUserUrl = `${process.env.REACT_APP_API_URL}product`;
const getAdOneUrl = `${process.env.REACT_APP_API_URL}product`;
const updateAdUrl = `${process.env.REACT_APP_API_URL}product`;
const getAdsPublicUrl = `${process.env.REACT_APP_API_URL}product-public?`;
const getAdUserOneUrl = `${process.env.REACT_APP_API_URL}product-user`;

export const createAd = async (
  title: string,
  price: string,
  phone: string,
  file: any,
  location: string,
  category: string,
  description: string,
  published: string = 'Нет'
) => {
  try {
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('price', price);
    formData.append('phone', phone);
    formData.append('file', file);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('published', published);

    const res = await axios.post(createUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (e: any) {
    return e.message;
  }
};

export const getAdsUser = async (limit: string, page: string, search: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(
      `${getAdsUserUrl}limit=${limit}&page=${page}&search=${search}`,
      config
    );

    return res?.data;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};

export const deleteAdUser = async (id: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.delete(`${deleteAdUserUrl}/${id}`, config);
    return res;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};

export const getAdOne = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${getAdOneUrl}/${id}`);

    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const getAdsPublic = async (
  limit: string,
  page: string,
  category?: string,
  search?: string
) => {
  try {
    const res = await axios.get(
      `${getAdsPublicUrl}limit=${limit}&page=${page}&category=${category}&search=${search}`
    );

    return res?.data;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};

export const updateAd = async (
  id: string | undefined,
  title: string,
  price: string,
  phone: string,
  file: any,
  location: string,
  category: string,
  description: string,
  published: string = 'Нет'
) => {
  try {
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('price', price);
    formData.append('phone', phone);
    formData.append('file', file);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('published', published);

    const res = await axios.put(`${updateAdUrl}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e: any) {
    return e.message;
  }
};

export const getAdUserOne = async (id: string | undefined) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await axios.get(`${getAdUserOneUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};
