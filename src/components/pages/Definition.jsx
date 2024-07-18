import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../NotFound';
import DefinitionSearch from '../DefinitionSearch';
import useFetch from '../../hooks/useFetch';

export default function Definition() {
  let { search } = useParams();

  const {
    request,
    data: [{ meanings: word }] = [{}],
    errorStatus,
  } = useFetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search);

  useEffect(() => {
    request();
  }, []);

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  if (errorStatus) {
    return (
      <>
        <p>Something went wrong</p>
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is a definition:</h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ''}:{meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search again:</p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
