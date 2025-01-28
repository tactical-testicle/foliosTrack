import { Types } from 'mongoose';

export default interface IDocument {
    tipoFolio: Types.ObjectId | { _id: Types.ObjectId; nombre: string };           
    tipoFolioString: string;
    fechaDocto: Date;                // Fecha en la que se crea el documento
    noConsecutivo: number;           // Número consecutivo del documento
    noOficio: string;                // Número de oficio del documento
    asunto: string;                  // Asunto relacionado con el documento
    subgerencia: string;             // Subgerencia encargada
    antecedentes: string;            // Información de antecedentes
    noAcuerdosGESSM: string;         // Número de acuerdos de GESSM
    anexos: boolean;                // Lista de anexos relacionados
    destinatarios: string[];         // Lista de destinatarios 
    remitente: Types.ObjectId | { _id: Types.ObjectId; nombre: string };               // Lista de remitentes
    observaciones: string;           // Observaciones generales
    rubricasElaboracion: string[];   // Lista de rúbricas de quien elabora el documento
    fechaCreacion: Date;             // Fecha de creación del registro
    usuarioCreacion: string;         // Usuario que lo creo
    fechaActualizacion?: Date;       // Fecha de la última actualización 
    usuarioActualizacion?: Date;     // Usuario que lo modifico
    status: string;                  // Para saber si esta borrado o no
}