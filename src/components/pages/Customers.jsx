import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared';
import AddCustomer from '../AddCustomer';
import { LoginContext } from '../../App';
import useFetch from '../../hooks/useFetch';

export default function Customers() {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  function toggleShow() {
    setShow(!show);
  }

  const url = baseUrl + 'api/customers/';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access'),
  };
  const {
    request,
    appendData,
    data: { customers } = {},
    errorStatus,
  } = useFetch(url, {
    method: 'GET',
    headers: headers,
  });

  useEffect(() => {
    request();
  }, []);

  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });
    if (!errorStatus) {
      toggleShow();
    }
  }
  return (
    <>
      <h1>Here are our Customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div className="p-2" key={customer.id}>
                <Link className="no-underline" to={'/customers/' + customer.id}>
                  <button className="flex min-w-48 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
    </>
  );
}
