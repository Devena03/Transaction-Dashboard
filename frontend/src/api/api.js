import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";  

// Fetch transactions
export const fetchTransactions = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions?month=${month}`);
    return response.data.transactions || []; // Ensure it's always an array
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Fetch statistics
export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics?month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return null;
  }
};

// Fetch bar chart data
export const fetchBarChart = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bar-chart?month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    return null;
  }
};
