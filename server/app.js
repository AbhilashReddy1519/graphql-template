import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import axios from "axios";

async function startServer() {
	const app = express();

	const server = new ApolloServer({
		typeDefs: `
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
        userId: ID!
        user: User
      }

      type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
      }

      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!):User
      }
    `,
		resolvers: {
      Todo: {
        user: async (todo) => (
          await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`,
           )
        ).data,
      },
			Query: {
				getTodos: async () =>
					(
						await axios.get(
							"https://jsonplaceholder.typicode.com/todos",
						)
					).data,
				getAllUsers: async () =>
					(
						await axios.get(
							"https://jsonplaceholder.typicode.com/users",
						)
					).data,
				getUser: async (parent, {id}) =>
					(
						await axios.get(
							`https://jsonplaceholder.typicode.com/users/${id}`,
						)
					).data,
			},
		},
	});

	await server.start();

	app.use(cors());
	app.use(express.json());

	app.use("/graphql", expressMiddleware(server));

	app.listen(8000, () => {
		console.log("🚀 Server running at http://localhost:8000/graphql");
	});
}

startServer();
