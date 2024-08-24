import axios from 'axios';

const API_URL = 'https://crypto-wallet-app-eight.vercel.app/api/v1/user/';

export const saveUserData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/save-user`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (address) => {
  try {
    const response = await axios.get(`${API_URL}/get-user/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
