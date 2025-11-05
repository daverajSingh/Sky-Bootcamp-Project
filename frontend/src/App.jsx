import {
  Home,
  Quiz,
  Simulator,
  AdminDashboard,
  Conversation,
  QuizFeedback,
} from "./pages/pagesIndex";
import { Layout, ProtectedRoute } from "./components";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="w-full max-w-[100vw]">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/simulator/:topicid" element={<Conversation />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/feedback" element={<QuizFeedback />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
