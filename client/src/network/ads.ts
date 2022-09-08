import axios from 'axios';

const createUrl = 'http://localhost:3001/add';
const getAdsUserUrl = 'http://localhost:3001/product-user?';
const deleteAdUserUrl = 'http://localhost:3001/product';
const getAdOneUrl = 'http://localhost:3001/product';
const getPhotoUrl = 'http://localhost:3001/photo';
const getAdsPublicUrl = 'http://localhost:3001/product-public?';

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

// export const getPhoto = async (namePhoto: string) => {
//   try {
//     const res = await axios.get(`${getPhotoUrl}/${namePhoto}`);

//     return res;
//   } catch (e: any) {
//     console.log(e);
//     return e;
//   }
// };

export const getAdsPublic = async (
  limit: string,
  page: string,
  category: string,
  search: string
) => {
  try {
    const res = await axios.get(`${getAdsPublicUrl}limit=${limit}&page=${page}&category=${category}&search=${search}`);

    return res?.data;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};
