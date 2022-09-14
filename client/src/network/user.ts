import axios from 'axios';

const loginUrl = `${process.env.REACT_APP_API_URL}login`;
const userProfileUrl = `${process.env.REACT_APP_API_URL}user`;
const logoutUrl = `${process.env.REACT_APP_API_URL}logout`;
const regUrl = `${process.env.REACT_APP_API_URL}reg`;

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(loginUrl, { email, password });

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

    return res.data;
  } catch (e: any) {
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
