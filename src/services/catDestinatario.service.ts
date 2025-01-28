import MongoConn from "../../lib/mongodb";
import CatDestinatarioModel from "../models/catDestinatarioModel";

export default class CatDestinatarioService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatDestinatario(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo folio con los datos proporcionados
            const newDestinatario = await CatDestinatarioModel.create(body);
            console.log(newDestinatario)
            return newDestinatario;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatDestinatarios() {
        try {
            await this.db.connectDB()
            const users = await CatDestinatarioModel.find();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatDestinatario(id: string): Promise<any> {
        try {
            console.log("Va a ver si existe el ", id);
            await this.db.connectDB()
            
            const existDestinatario = await CatDestinatarioModel.findOne({ _id: id }).exec();
            console.log("-- --> infosubgerencia: ", existDestinatario);
            return existDestinatario

        } catch (err) {
            // Manejo de errores
            console.error("Error al buscar la subgerencia:", err);
            throw err;
        } finally {
            await this.db.disconnectDB();
        }
    }
}
