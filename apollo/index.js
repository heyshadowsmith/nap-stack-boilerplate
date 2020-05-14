import { ApolloServer, gql } from 'apollo-server'
import {} from 'dotenv/config'
import { prisma } from '../prisma/generated/prisma-client'

const typeDefs = gql`
  type Query {
    users: [User]!
  }

  type Mutation {
    createUser(name: String!): User!
    updateUser(id: ID! name: String!): User!
    deleteUser(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
  }
`

const resolvers = {
  Query: {
    users: (parent, args, { prisma }) => prisma.users()
  },
  Mutation: {
    createUser: (parent, { name }, { prisma }) => prisma.createUser({ name }),
    deleteUser: (parent, { id }, { prisma }) => prisma.deleteUser({ id }),
    updateUser: (parent, { id, name }, { prisma }) => {
      return prisma.updateUser({
        where: {
          id
        },
        data: {
          name
        }
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  },
  playground: true,
  introspection: true
})

server.listen().then(({ url }) => console.log(`Apollo is running at ${url}`))
