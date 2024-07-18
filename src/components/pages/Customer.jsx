import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import NotFound from '../NotFound';
import { baseUrl } from '../../shared';
import { LoginContext } from '../../App';

export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!customer) return;
    if (!tempCustomer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;
    if (equal) setChanged(false);
  });

  useEffect(() => {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          setLoggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw new Error('Something went wrong, try again later');
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  const deleteCustomer = (e) => {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        navigate('/customers/');
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setChanged(false);
        setCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <>
          <form
            id="customer"
            className="space-y-3 bg-gray-300 p-4 rounded-md inline-block"
            onSubmit={updateCustomer}>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              value={tempCustomer.name}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({ ...tempCustomer, name: e.target.value });
              }}
            />
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="industry">
              Industry
            </label>
            <input
              id="industry"
              className="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              value={tempCustomer.industry}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({ ...tempCustomer, industry: e.target.value });
              }}
            />
          </form>
          {changed ? (
            <div className="flex">
              <button
                className="justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}>
                Cancel
              </button>
              <button
                form="customer"
                className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2">
                Save
              </button>
            </div>
          ) : null}
          <button
            onClick={deleteCustomer}
            className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 m-2">
            Delete
          </button>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">
        <button className="justify-center no-underline rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          ← Go back
        </button>
      </Link>
    </>
  );
}
