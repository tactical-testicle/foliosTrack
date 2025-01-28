import MongoConn from "../../lib/mongodb";
import FolioModel from "../models/folioModel";
import IFolio from "../interfaces/folio.interface"
import mongoose, { Types } from 'mongoose';
import csv from 'csvtojson';


export default class UserService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createFolio(body: any): Promise<any> {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados
            const newFolio = await FolioModel.create(body);
            return newFolio;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getFolios() {
        try {
            await this.db.connectDB()
            const folios = await FolioModel.find()
            .populate('tipoFolio', 'nombre')
            .populate('destinatarios', 'nombre')
            .populate('remitente', 'nombre') 
            .exec();
            return folios;
        } catch (err) {
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getFolio(id: number){
        try {
        console.log("Va a ver si existe el ", id)
        await this.db.connectDB()
            const existUser = await FolioModel.findOne({ id: id });
        console.log("resulta que: ", existUser)
            return existUser;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async updateFolio(body: any) {
        try {
            await this.db.connectDB()
            console.log("id ->", body._id)
            const newFolio = await FolioModel.findByIdAndUpdate(body._id, body, { new: true });
            return newFolio;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getFolioConsecutivo(tipoFolioId: string): Promise<number>{
        try {
            await this.db.connectDB()      
            //const objectId = new Types.ObjectId(tipoFolioId);
            const count = await FolioModel.countDocuments({ tipoFolio: tipoFolioId });
            return count;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getExisteNoAcuerdo(noAcuerdosGESSM: string): Promise<number>{
        try {
            await this.db.connectDB()                  
            const count = await FolioModel.countDocuments({ noAcuerdosGESSM: noAcuerdosGESSM });
            return count;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async bulkUploadFromCSV(filePath: any): Promise<any> {
        try {
            await this.db.connectDB();

            console.log("Leyendo archivo CSV..." ,filePath);
            const foliosArray = await csv().fromFile(filePath.tempFilePath); // Convierte el archivo CSV a JSON

            console.log("Validando datos...");
            const validFolios = foliosArray.map((folio: any) => {
                // Mapear 
                return {
                    tipoFolio: folio.tipoFolio,
                    destinatarios: folio.destinatarios ? folio.destinatarios.split(',') : [],
                    remitente: folio.remitente
                    
                };
            });

            console.log("Insertando datos en la base de datos...");
            const result = await FolioModel.insertMany(validFolios); // Inserta los registros en la base de datos
            console.log("Carga masiva completada con éxito.");

            return {
                message: "Carga masiva completada con éxito.",
                insertedCount: result.length,
            };
        } catch (err) {
            console.log("Error en bulkUploadFromCSV:", err);
            throw err;
        } finally {
            await this.db.disconnectDB();
        }
    }
    
    async getFoliosFicha(userFicha: String) {
        try {
            await this.db.connectDB()
            const folios = await FolioModel.find({ usuarioCreacion: userFicha })
            .populate('tipoFolio', 'nombre')
            .populate('destinatarios', 'nombre')
            .populate('remitente', 'nombre') 
            .exec();
            console.log("Somo mostrara los folios del usuario: ", userFicha)
            return folios;
        } catch (err) {
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

}
