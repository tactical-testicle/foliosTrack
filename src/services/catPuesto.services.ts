import MongoConn from "../../lib/mongodb";
import CatPuestoModel from "../models/catPuestoModel";

export default class CatPuestoService {
    private readonly db: MongoConn
    constructor(){
        this.db = MongoConn.getInstance()
    }
    async createCatPuesto(body: any) {
        try {
            await this.db.connectDB()           
            const exists = await CatPuestoModel.findOne({ nivel: body.nivel });
            if (exists) 
            throw new Error(`El nivel ${body.nivel} ya está registrado.`);
            
            const newPuesto = await CatPuestoModel.create(body);
            console.log(newPuesto)
            return newPuesto;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatPuestos() {
        try {
            await this.db.connectDB()
            const users = await CatPuestoModel.find();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }

    async getCatPuesto(id: string): Promise<any> {
        try {
        await this.db.connectDB()
            const existPuesto = await CatPuestoModel.findOne({ _id: id }).exec();
            return existPuesto;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        }finally{
            await this.db.disconnectDB()
        }
    }
}
