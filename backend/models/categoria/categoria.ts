import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//collections for MongoDB
const categoriaShema = new Schema({
    
    fechaCreación: {
        type: Date,
        default: Date.now
    },

    nombre: {
        type: String,
        default: '',
        required: true
    },

    descripcion: {
        type: String,
        default: '',
        required: true
    }

});

export default mongoose.model('categoria', categoriaShema);