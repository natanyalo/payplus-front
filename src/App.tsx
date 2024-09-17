// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import Signup from './components/Signup';
import Login from './components/Login';
import Customer from './components/Customer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/customers"
            element={
              isAuthenticated ? <Customer /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// const CustomerPage: React.FC = () => {
//   const customers = [
//     { id: 1, name: 'John Doe', birthday: '1990-01-01', phone: '123-456-7890', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', birthday: '1985-05-12', phone: '098-765-4321', email: 'jane@example.com' },
//   ];

//   return <Customer customers={customers} />;
// };

export default App;
