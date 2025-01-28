
import mongoose, { Schema, Document } from 'mongoose';
import MongoConn from "../../lib/mongodb";
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

const catFolioSchema: Schema = new Schema({
    nombre: { type: String, required: true },           // Nombre de la entidad
    id: { type: Number, unique: true }, // Campo autoincremental               
    fechaCreacion: { type: Date, default: Date.now },           // Fecha de creación del registro
    usuarioCreacion: { type: String, required: false },          // Usuario que creó el registro
    fechaActualizacion: { type: Date, required: false },        // Fecha de la última actualización
    usuarioActualizacion: { type: String, required: false },    // Usuario que lo modificó
    status: { type: String, default: 'active' }                 // Para saber si esta borrado o no
});
catFolioSchema.plugin(AutoIncrementFactory, { inc_field: 'id' });
export default mongoose.model('catFolio', catFolioSchema);