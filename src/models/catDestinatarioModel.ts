import mongoose, { Schema, Document } from 'mongoose';
import MongoConn from "../../lib/mongodb";

const catDestinatarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },           // Nombre de la entidad
    id: { type: Number },       
    fechaCreacion: { type: Date, default: Date.now },           // Fecha de creación del registro
    usuarioCreacion: { type: String, required: false },          // Usuario que creó el registro
    fechaActualizacion: { type: Date, required: false },        // Fecha de la última actualización
    usuarioActualizacion: { type: String, required: false },    // Usuario que lo modificó
    status: { type: String, default: 'active' }                 // Para saber si esta borrado o no
});
export default mongoose.model('catDestinatario', catDestinatarioSchema);