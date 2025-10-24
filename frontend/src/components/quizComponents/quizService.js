import axios from 'axios';
import { API_BASE } from '../../env.js';

export async function fetchQuiz() {
  try {
    const res = await axios.get(`${API_BASE}/api/quiz`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch quiz data:', error);
    return [];
  }
}

export default { fetchQuiz };
