import axios from 'axios';

const loginUrl = 'http://localhost:3001/login';
const userProfileUrl = 'http://localhost:3001/user';
const logoutUrl = 'http://localhost:3001/logout';
const regUrl = 'http://localhost:3001/reg';

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(loginUrl, { email, password });

    console.log(res);

    if (res.statusText === 'OK') {
      localStorage.setItem('accessToken', res?.data);
    }

    return res?.data;
  } catch (e: any) {
    console.log(e.message);
    console.log(e);

    return e.message;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(userProfileUrl, config);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e.message);

    return e.message;
  }
};

export const registration = async (
  Name: string,
  surName: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post(regUrl, { Name, surName, email, password });

    console.log(res);
    return res.data;
  } catch (e: any) {
    console.log(e);

    console.log(e.message);

    return e.message;
  }
};

export const userLogout = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios.get(logoutUrl, config);
  } catch (error) {
    console.log(error);
  }
};
