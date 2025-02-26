import { Routes, Route, Navigate } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider, useAuth } from "./features/AuthContext";
import { ThemeProvider } from "./features/ThemeContext";
import "./index.css";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevent flickering while checking auth

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app">
          <Header />
          <div className="my-0 mx-10">
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/movie/:imdbID" element={<ProtectedRoute element={<MovieDetail />} />} />

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
