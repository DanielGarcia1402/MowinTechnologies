import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//collections for MongoDB
const ClienteShema = new Schema({
    
    fechaCreación: {
        type: Date,
        default: Date.now
    },

    cedula: {
        type: String,
        default: '',
        required: true
    },

    nombre: {
        type: String,
        default: '',
        required: true
    },

    direccion: {
        type: String,
        default: '',
        required: true
    },

    telefono: {
        type: String,
        default: '',
        required: true
    }

});

export default mongoose.model('clientes', ClienteShema);