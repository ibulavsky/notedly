// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')

const port = process.env.PORT || 4000;

let notes = [
  {id: '1', content: 'This is a note', author: 'Adam Scott'},
  {id: '2', content: 'This is my note', author: 'Igor Bulavsky'},
  {id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison'},
];

//Построение схемы GraphQL
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  
  type Mutation {
    newNote(content: String!): Note!
  }
`;

//Распознаватель
const resolvers = {
  Query: {
    hello: () => `Hello world!`,
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Igor Bulavsky'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();
//ApolloServer
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app, path: '/api'});
app.listen({port}, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);