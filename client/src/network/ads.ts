import axios from 'axios';

const createUrl = 'http://localhost:3001/add';

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

export const getAd = () => {};
