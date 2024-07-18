import { useState } from 'react';
import '../../index.css';
import Employee from '../../components/Employee';
import AddEmployee from '../../components/AddEmployee';
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from '../../components/EditEmployee';

function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Andrii', role: 'Developer', img: '/img/andrii.jpg' },
    { id: 2, name: 'Bogdan', role: 'QA', img: '/img/bogdan.jpg' },
    { id: 3, name: 'Andrii', role: 'Developer', img: '/img/andrii.jpg' },
    { id: 4, name: 'Bogdan', role: 'QA', img: '/img/bogdan.jpg' },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }
  return (
    <div>
      {employees ? (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <h1>You cannot see the employees</h1>
        </div>
      )}
      <AddEmployee newEmployee={newEmployee} />
    </div>
  );
}

export default Employees;
