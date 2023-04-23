import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import { useAuth } from './hooks/auth';

import './styles/reset.scss';
import './styles/main.scss';

interface IProtectedRouteProps {
  condition: boolean;
  fallbackPath: string;
}

const ProtectedRoute = ({
  condition,
  fallbackPath,
}: IProtectedRouteProps): JSX.Element => {
  return condition ? <Outlet /> : <Navigate to={fallbackPath} replace />;
};

const App = (): JSX.Element => {
  const { auth } = useAuth();

  if (typeof auth === 'undefined') {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute condition={!auth} fallbackPath="/" />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route
        element={<ProtectedRoute condition={!!auth} fallbackPath="/login" />}
      >
        <Route path="/logout" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
