import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <LoginScreen />} />
        <Route path="/register" element={user ? <Navigate to="/home" replace /> : <RegisterScreen />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? '/home' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
