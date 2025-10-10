import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function fetchQuiz() {
  const res = await axios.get(`${API_BASE}/`);
  // json-server will serve the file root (an array) at /
  return res.data;
}

export default { fetchQuiz };
