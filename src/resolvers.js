import Cliente from './models/Cliente.js'

export const resolvers = {
    Query: {
        clients: async () => {
            return await Cliente.find()
        },

    },
    Mutation: {
        async addCliente(_, { nombre,telefono,age }) {
            const c={"nombre":nombre,"telefono":telefono,"age":age}
            const newCliente = new Cliente(c)
            await newCliente.save()
            return c
        },
        async deleteCliente(_,{id}){
            await Cliente.deleteOne({_id:id})
            return true
        },
        async updateCliente(_,{id,nombre, telefono, age}){
            const c=Cliente.findById(id)
            c.nombre=nombre
            c.telefono=telefono
            c.age=age
            Cliente.updateOne(c)
            return c
        }

    }
}