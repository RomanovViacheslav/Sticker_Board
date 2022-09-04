import axios from 'axios';

const createUrl = 'http://localhost:3001/add';
const getAdsUserUrl = 'http://localhost:3001/product-user?';

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

export const getAdsUser = async (limit: string, page: string, search:string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(`${getAdsUserUrl}limit=${limit}&page=${page}&search=${search}`, config);

    return res?.data;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};
