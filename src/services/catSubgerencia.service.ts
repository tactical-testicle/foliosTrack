import MongoConn from "../../lib/mongodb";
import CatSubgerenciaModel from "../models/catSubgerenciaModel";

export default class CatSubgerenciaService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatSubgerencia(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados
            const newSubgerencia = await CatSubgerenciaModel.create(body);
            console.log(newSubgerencia)
            return newSubgerencia;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatSubgerencias() {
        try {
            await this.db.connectDB()
            const users = await CatSubgerenciaModel.find();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    /*async getCatSubgerencia(id: string){
        try {
        console.log("Va a ver si existe el ", id)
        const existSubgerencia = await CatSubgerenciaModel.findOne({ _id: id });       
        console.log("existSubgerencia: ", existSubgerencia)
            return existSubgerencia;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }*/

    async getCatSubgerencia(id: string): Promise<any> {
        try {
            await this.db.connectDB()
            
            const existSubgerencia = await CatSubgerenciaModel.findOne({ _id: id }).exec();
            return existSubgerencia

        } catch (err) {
            // Manejo de errores
            console.error("Error al buscar la subgerencia:", err);
            throw err;
        } finally {
            await this.db.disconnectDB();
        }
    }
}
