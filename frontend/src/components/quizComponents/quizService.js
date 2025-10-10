import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function fetchQuiz() {
  try {
    const res = await axios.get(`${API_BASE}/topics`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch quiz data:', error);
    return [];
  }
}

export default { fetchQuiz };
