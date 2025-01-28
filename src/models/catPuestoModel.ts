import mongoose, { Schema } from 'mongoose';

const catPuestoSchema: Schema = new Schema({
    nombre: { type: String, required: true },           // Nombre de la entidad
    nivel: { type: Number, required: true, unique: true },           // Nombre de la entidad
    fechaCreacion: { type: Date, default: Date.now },           // Fecha de creación del registro
    usuarioCreacion: { type: String, required: false },          // Usuario que creó el registro
    fechaActualizacion: { type: Date, required: false },        // Fecha de la última actualización
    usuarioActualizacion: { type: String, required: false },    // Usuario que lo modificó
    status: { type: String, default: 'active' }                 // Para saber si esta borrado o no
});
export default mongoose.model('catPuesto', catPuestoSchema);