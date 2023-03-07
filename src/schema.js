
import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from "./resolvers.js"

const typeDefs = `
    type Cliente {
        _id: ID
        nombre: String!
        telefono: String!
        age: Int
    }

    type Query {
        clients: [Cliente]
        client(id: Int): Cliente
    }

    type Mutation {
        addCliente(nombre: String, telefono: String, age: Int): Cliente
        updateCliente(id:Int,nombre: String, telefono: String): Cliente
        deleteCliente(id: String): Boolean
    }
`

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})