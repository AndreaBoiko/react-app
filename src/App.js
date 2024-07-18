import Header from './components/Header';
import Employees from './components/pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Customers from './components/pages/Customers';
import Dictionary from './components/pages/Dictionary';
import Definition from './components/pages/Definition';
import NotFound from './components/NotFound';
import Customer from './components/pages/Customer';
import Login from './components/pages/Login';
import { baseUrl } from './shared';
import Register from './components/pages/Register';

export const LoginContext = createContext();

function App() {
  useEffect(() => {
    function refreshToken() {
      if (localStorage.getItem('refresh')) {
        const url = baseUrl + 'api/token/refresh/';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: localStorage.getItem('refresh'),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            setLoggedIn(true);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
    }
    const minute = 1000 * 60;
    refreshToken();
    setInterval(refreshToken, minute * 3);
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }
  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
