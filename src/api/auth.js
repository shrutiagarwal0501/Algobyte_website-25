const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';


// Helper function to handle API calls
const apiCall = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add token if it exists
  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const signup = async (name, email, password) => {
  const data = await apiCall('/signup', 'POST', { name, email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const signin = async (email, password) => {
  const data = await apiCall('/signin', 'POST', { email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const forgotPassword = async (email) => {
  return await apiCall('/forgot-password', 'POST', { email });
};

export const resetPassword = async (token, password) => {
  return await apiCall(`/reset-password/${token}`, 'POST', { password });
};

export const getCurrentUser = async () => {
  return await apiCall('/me');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};