var express = require('express');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');

// Construimos el schema
var schema = buildSchema(`

    type Cliente {
        id: Int
        nombre: String
        telefono: String
	}

    type Query {
    	clientes: [Cliente]
    	cliente(id: Int): Cliente
  	}

    type Mutation {
    	addCliente(nombre: String, telefono: String): Cliente
        updateCliente(id:Int,nombre: String, telefono: String): Cliente
        deleteCliente(id: Int): Boolean
  	}

`);

var clientes = [];
var counter = 1;

var root = {
    clientes: () => { return clientes; },

    cliente: (data) => {
        for (var i = 0; i < clientes.length; i++)
            if (clientes[i].id == data.id)
                return clientes[i];

        return null;
    },

    addCliente: (data) => {
        var c = { 'id': counter, 'nombre': data.nombre, 'telefono': data.telefono };
        clientes.push(c);
        counter++;
        return c;
    },

    updateCliente: (data) => {
        var c = {'id':data.id,'nombre':data.nombre, 'telefono': data.telefono}
        clientes.forEach((cliente,index)=>{
            if(cliente.id==data.id){
                cliente[index]={
                    'nombre':data.nombre, 
                    'telefono': data.telefono
                }
            }
        })
        return c
    },
    deleteCliente: (id)=>{
        clientes=clientes.filter(cliente=> cliente.id !=id)
        return true
    }
};

// Arrancamos el servidor web
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('GraphQL API en http://localhost:4000/graphql');