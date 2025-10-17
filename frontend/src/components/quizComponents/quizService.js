import axios from 'axios';

// Use Vite environment variables exposed to the client. Vite exposes vars prefixed with VITE_.
const API_BASE = 'http://localhost:4000';

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
