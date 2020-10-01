const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date')


// Resolvers
const resolvers = {
  /* your other resolvers */
  DateTime: GraphQLDateTime,
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  scalar DateTime
  scalar VideoCategory

  type Query {
    readNote(id: Int!): Note
    queryNotes: [Note]
  }

  type Note{
    id: Int
    title: String
    date: DateTime
    url: String
    content: String
    video: VideoCategory
  }
`);

const notes = [
  {
    id: 1,
    title: "test 1",
    date: "2020-01-01",
    url: "http://www.test1url.com",
    content: "TODO test 1",
    video: "TO BE FIXED"
  },
  {
    id: 2,
    title: "test 2",
    date: "2020-02-02",
    url: "http://www.test2url.com",
    content: "TODO test 2",
    video: "TO BE FIXED"
  },
  {
    id: 3,
    title: "test 3",
    date: "2020-02-02",
    url: "http://www.test3url.com",
    content: "TODO test 3",
    video: "TO BE FIXED"
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