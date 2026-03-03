import { gql } from '@apollo/client';
import './App.css'
import { useQuery } from '@apollo/client/react';

const query = gql`
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

function App() {
  const {loading, error, data} = useQuery(query);
  if(loading) return <h1>Loading...</h1>;
  if(error) return <h1>Error: {error.message}</h1>
  return (
    <>
      <table>
        <tbody>
          {data.getTodos.map(todo => (
            <tr>
              <td>
                {todo.title}
              </td>
              <td>
                {todo.user.name}
              </td>
              <td>
                {todo.user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>    
  )
}

export default App
