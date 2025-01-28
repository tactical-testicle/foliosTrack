import MongoConn from "../../lib/mongodb";
import mongoose, { Types } from 'mongoose';
import CatRemitenteModel from "../models/catRemitenteModel";

export default class CAtRemitenteService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatRemitente(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados

           
           

            const newRemitente = await CatRemitenteModel.create(body);

            console.log(newRemitente)
            const resRemitente = newRemitente
            return resRemitente;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatRemitentes() {
        try {
            await this.db.connectDB()
            const folios = await CatRemitenteModel.find();
            return folios;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatRemitente(id: string): Promise<any>{
        try {
            await this.db.connectDB()
        
            const existUser = await CatRemitenteModel.findOne({ id: id });
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

   
}
