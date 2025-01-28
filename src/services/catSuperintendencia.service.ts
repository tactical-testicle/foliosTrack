import MongoConn from "../../lib/mongodb";
import CatSuperintendenciaModel from "../models/catSuperintendenciaModel";

export default class CatSuperintendenciaService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatSuperintendencia(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados
            const newSuperintendencia = await CatSuperintendenciaModel.create(body);
            console.log(newSuperintendencia)
            return newSuperintendencia;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatSuperintendencias() {
        try {
            await this.db.connectDB()
            const users = await CatSuperintendenciaModel.find();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatSuperintendencia(id: string): Promise<any> {
        try {
            const existUser = await CatSuperintendenciaModel.findOne({ _id: id }).exec();
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
