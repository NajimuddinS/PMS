import axios from 'axios';

const API_BASE_URL = 'https://crudcrud.com/api/f2dedd92e4fa4092abbfa55d3474a7b4';
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

class ApiService {
  async getUserByEmail(email) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const users = response.data;
      return users.find(user => user.email === email);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async uploadImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}

export default new ApiService();