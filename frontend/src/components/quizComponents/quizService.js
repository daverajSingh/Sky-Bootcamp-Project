import axios from 'axios';
import { API_BASE } from '../../env.js';

async function fetchQuiz() {
  try {
    const res = await axios.get(`${API_BASE}/api/quiz`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch quiz data:', error);
  }
}

async function postQuizResults(details) {
  try {
    const res = await axios.post(`${API_BASE}/api/quiz`, details);
    return res.data;
  } catch (error) {
    console.error('Failed to post the quiz session information:', error);
  }
}

export default { fetchQuiz, postQuizResults };
