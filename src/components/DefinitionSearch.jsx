import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionSearch() {
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  return (
    <form
      className="flex space-between space-x-2 max-w-[300px]"
      onSubmit={() => {
        navigate('/dictionary/' + word);
      }}>
      <input
        className="shrink min-w-0 px-2 py-1 rounded "
        placeholder="Dinosaur"
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Search
      </button>
    </form>
  );
}
