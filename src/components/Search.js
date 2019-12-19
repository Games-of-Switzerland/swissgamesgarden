import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {ReactiveBase, DataSearch} from "@appbaseio/reactivesearch";
import Results from "./Results";

const Search = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchGames('');
  }, []);

  const searchGames = async query => {
    try {
      const qq = {
        query: {
          fuzzy: {
            title: {
              value: query,
              fuzziness: 'AUTO',
            }
          },
        }
      };
      const response = await fetch(`http://localhost:9200/_search`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qq)
      });
      const results = await response.json();
      setResults(results.hits.hits);
    } catch (error) {
      console.trace(error.message)
    }
  };

  const handleChange = e => {
    const search_query = e.target.value;
    searchGames(search_query);
  };

  return (
    <div>
      {/*<input type="text" onChange={handleChange}/>*/}
      {/*<Games games={results}/>*/}

      <p>Reactivesearch:</p>

      <ReactiveBase
        app="gos_node_game"
        url="http://localhost:9200"
        credentials="null"
      >
        {/*<CategorySearch*/}
        {/*  componentId="categorysearch"*/}
        {/*  dataField={['name', 'title']}*/}
        {/*  categoryField="title.keyword"*/}
        {/*  placeholder="Search for games"*/}
        {/*/>*/}
        <DataSearch
          componentId="datasearch"
          dataField={['title', 'title.keyword']}
          fieldWeights={[1,3]}
          placeholder="Search games"
          autosuggest={true}
          showClear={true}
        />
          <Results
            react={{
              and: ['categorysearch', 'datasearch'],
            }}
          />
      </ReactiveBase>
    </div>
  )
};

export default Search;
