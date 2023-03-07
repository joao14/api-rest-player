import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema.js"
import { connect } from "./database.js"

// Arrancamos el servidor web
const app = express();

connect();

app.get("/", (req, res) => {
    res.json({
        "message": "API Rest 1.0"
    })

})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,

}));

app.listen(4000);
console.log('GraphQL API en http://localhost:4000/graphql');