import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import RegisterPage from './pages/RegisterPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/:id/transactions" element={<Transactions />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
