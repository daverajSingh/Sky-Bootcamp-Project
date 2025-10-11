import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Simulator from './pages/Simulator';
import Admin from './pages/Admin';
import Layout from './components/Layout';
import { AuthProvider } from './components/AuthContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/quiz" element={<Quiz />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
