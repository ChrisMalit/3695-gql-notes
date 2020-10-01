const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    readNote(id: Int!): Note
    queryNotes: [Note]
  }

  type Note{
    id: Int
    title: String
    url: String
    content: String
  }
`);

const notes = [
  {
    id: 1,
    title: "test 1",
    url: "http://www.test1url.com",
    content: "TODO test 1"
  },
  {
    id: 2,
    title: "test 2",
    url: "http://www.test2url.com",
    content: "TODO test 2"
  },
  {
    id: 3,
    title: "test 3",
    url: "http://www.test3url.com",
    content: "TODO test 3"
  },
]

// The root provides a resolver function for each API endpoint
const root = {
  readNote: ({ id }) => {
    return notes.find(notes => notes.id == id);
  },
  queryNotes: () => {
    return notes;
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');