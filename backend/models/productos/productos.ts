import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//collections for MongoDB
const productosShema = new Schema({
    
    fechaCreación: {
        type: Date,
        default: Date.now
    },

    nombre: {
        type: String,
        default: '',
        required: true
    },

    precio: {
        type: String,
        default: '',
        required: true
    },

    unidad: {
        type: String,
        default: '',
        required: true
    },

    imagen: {
        type: String,
        default: '',
        required: true
    },

    proveedor: {
        type: String,
        default: '',
        required: true
    },

    categoria: {
        type: String,
        default: '',
        required: true
    }

});

export default mongoose.model('producto', productosShema);