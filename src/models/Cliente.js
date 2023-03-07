import {Schema, model} from "mongoose"

const clienteSchema= new Schema({
    nombre:{
        type: String,
        require: true
    },
    telefono:{
        type: String,
        require: true
    },
    age: Number
})

export default model('Cliente',clienteSchema)