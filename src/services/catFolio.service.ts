import MongoConn from "../../lib/mongodb";
import mongoose, { Types } from 'mongoose';
import CatFolioModel from "../models/catFolioModel";

export default class CAtFolioService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatFolio(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados

           
           

            const newFolio = await CatFolioModel.create(body);

            console.log(newFolio)
            const resFolio = newFolio
            return resFolio;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatFolios() {
        try {
            await this.db.connectDB()
            const folios = await CatFolioModel.find();
            return folios;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    // Regresa el objeto del catFolio que conincide con el id enviado.
    async getCatFolio(id: string): Promise<any>{
        try {
            await this.db.connectDB()
            const catFolioObj = await CatFolioModel.findById({ _id: id });            
            return catFolioObj;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

   
}
