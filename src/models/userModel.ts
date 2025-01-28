import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    ficha: { type: Number, required: true },   
    nivel: { type: Schema.Types.ObjectId, ref: 'catPuesto', required: true }, 
    role: { type: String, default: 'user' },
    salt: { type: String,required: true},
    gerencia: { type: Schema.Types.ObjectId, required: true, ref: 'catGerencias' },
    subgerencia: { type: Schema.Types.ObjectId, ref: 'catSubgerencias' },
    superintendencia: { type: Schema.Types.ObjectId, ref: 'catSuperintendencias' },
    rubrica: {type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },           // Fecha de creación del registro
    usuarioCreacion: { type: String, required: false },          // Usuario que creó el registro
    fechaActualizacion: { type: Date, required: false },        // Fecha de la última actualización
    usuarioActualizacion: { type: String, required: false },    // Usuario que lo modificó
    status: { type: String, default: 'active' }                 // Para saber si esta borrado o no
});

export default mongoose.model('User', userSchema);
