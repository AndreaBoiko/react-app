import { useEffect, useState, useContext } from 'react';
import { baseUrl } from '../../shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';

export default function Register() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  }, []);

  function register(e) {
    e.preventDefault();
    const url = baseUrl + 'api/register/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setLoggedIn(true);
        navigate(location?.state?.previousUrl ? location.state.previousUrl : '/customers');
      });
  }
  return (
    <>
      <form
        id="register"
        className="space-y-3 bg-gray-300 p-4 rounded-md inline-block"
        onSubmit={register}>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </form>
      <button
        form="register"
        className="block justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2">
        Register
      </button>
    </>
  );
}
