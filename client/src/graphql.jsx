import React from 'react';
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const link = new HttpLink({ uri: "http://localhost:8000" });
const cache = new InMemoryCache();
const client = new ApolloClient({
	link: link,
	// uri: "http://localhost:8000", or like this also
  cache: cache
});

// Two ways we can do directly and with provider 

// Query will be a string
// query = query *Todos*-> can be any name
const query = `
  query GetTodos {
    getTodos {
      title
      user {
        name
        email
      }
    }
  }
`;

// const client = ...

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

function Graphql() {
  return (
    <div>
      
    </div>
  )
}

export default Graphql;

// this is one type of setup ans using apollo provider we use main.jsx and new apollo.jsx
