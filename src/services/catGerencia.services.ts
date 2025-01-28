import MongoConn from "../../lib/mongodb";
import CatGerenciaModel from "../models/catGerenciaModel";

export default class CatGerenciaService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatGerencia(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados
            const newGerencia = await CatGerenciaModel.create(body);
            console.log(newGerencia)
            return newGerencia;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatGerencias() {
        try {
            await this.db.connectDB()
            const users = await CatGerenciaModel.find();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatGerencia(id: string): Promise<any> {
        try {
        await this.db.connectDB()
            const existGerencia = await CatGerenciaModel.findOne({ _id: id }).exec();
            return existGerencia;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }
}
