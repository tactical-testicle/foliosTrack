import mongoose, { Schema, Document } from 'mongoose';

const folioSchema: Schema = new Schema({
    tipoFolio: { type: Schema.Types.ObjectId, ref: 'catFolio', required: true }, // Oficio true, Tarjeta false
    fechaDocto: { type: Date, required: false },                 // Fecha en la que se crea el documento
    noConsecutivo: { type: Number, required: false },            // Número consecutivo del documento
    noOficio: { type: String, required: false, unique: true },                 // Número de oficio del documento
    asunto: { type: String, required: true },                   // Asunto relacionado con el documento
    subgerencia: { type: String, required: false },              // Subgerencia encargada
    antecedentes: { type: String, required: true },            // Información de antecedentes
    noAcuerdosGESSM: { type: String, required: false },         // Número de acuerdos de GESSM
    anexos: { type: Boolean, required: false },                // Lista de anexos relacionados
    destinatarios: { type: [Schema.Types.ObjectId], ref: 'catDestinatario' }, // Debe ser un array si es una relación de uno a muchos
    remitente: { type: Schema.Types.ObjectId, ref: 'catRemitente', required: true },            // Persona o entidad que firma el documento
    observaciones: { type: String, required: false },           // Observaciones generales
    rubricasElaboracion: { type: [String], required: false },   // Lista de rúbricas de quien elabora el documento
    fechaCreacion: { type: Date, default: Date.now },           // Fecha de creación del registro
    usuarioCreacion: { type: String, required: false },          // Usuario que creó el registro
    fechaActualizacion: { type: Date, required: false },        // Fecha de la última actualización
    usuarioActualizacion: { type: String, required: false },    // Usuario que lo modificó
    status: { type: String, default: 'active' }                 // Para saber si esta borrado o no
});

export default mongoose.model('Folio', folioSchema);