import { makeExecutableSchema } from 'graphql-tools';
import Event from './event';
import User from './user';


const RootQuery = `
  type RootQuery {
    event(id: Int!): Event,
    events: [Event]

    user(id: Int!): User,
    users: [User],
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;


export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    Event, User
  ]
});
