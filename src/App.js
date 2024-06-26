import { useState } from 'react';
import './App.css';
import Employee from './components/Employee';

function App() {
  const [role, setRole] = useState('dev');
  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setRole(e.target.value)
        }}
      />
      <Employee name="Andrii" role="programmer" />
      <Employee name="Bogdan" role={role} />
    </div>
  );
}

export default App;
