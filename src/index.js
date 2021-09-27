// index.js
// This is the main entry point of our application

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");
const models = require("./models");
//Схема
const typeDefs = require("./schema");
//Распознаватель
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

//Connect DB
db.connect(DB_HOST);

//ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  }
});

server.applyMiddleware({ app, path: "/api" });
app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);