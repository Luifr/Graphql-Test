import express from 'express';
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql';
import resolvers from './resolvers';
import fs from 'fs';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    rootValue: resolvers,
    schema: buildSchema(fs.readFileSync('./schema.graphql').toString()),
    graphiql: true,
  }),
);

app.listen(4000);