import { ObjectId } from "mongoose";
import MongoConn from "../../lib/mongodb";
import UserModel from "../models/userModel";

export default class UserService {
    private readonly db: MongoConn
    constructor() {
        this.db = MongoConn.getInstance()
    }
    async createUser(body: any) {
        try {
            await this.db.connectDB()
            // Crea un nuevo usuario con los datos proporcionados
            const newUser = await UserModel.create(body);
            console.log(newUser)
            return newUser;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        } finally {
            await this.db.disconnectDB()
        }
    }

    async getUsers(id: string) {
        try {
            await this.db.connectDB()
            console.log('aqui estoy populate')

            const users = await UserModel.find({_id: {$ne: id} })
                .populate([
                    {path:'nivel', select: 'nombre'},
                ])
                // .populate('gerencia','name')
                .exec();
            return users;
        } catch (err) {
            // Manejo de errores
            throw err;
        } finally {
            await this.db.disconnectDB()
        }
    }

    async getUser(ficha: number) {
        try {
            await this.db.connectDB()
            const existUser = await UserModel.findOne({ ficha })
            return existUser;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        } finally {
            await this.db.disconnectDB()
        }
    }

    async getUserId(id: string) {
        try {
            await this.db.connectDB()
            const existUser = await UserModel.findById({ _id: id})
            console.log(existUser)
            return existUser;
        } catch (err) {
            // Manejo de errores
            console.log(err)
            throw err;
        } finally {
            await this.db.disconnectDB()
        }
    }

    async updateUser(body: any) {
        try {
            await this.db.connectDB()
            const newUser = await UserModel.findByIdAndUpdate(
                body._id,               // El ID del usuario que quieres actualizar
                body,                   // Los datos nuevos para actualizar
                { new: true }           // Opción para devolver el usuario actualizado
            );            
            return newUser;
        } catch (err) {
            console.log("err: ", err)
            throw err;
        } finally {
            await this.db.disconnectDB()
        }
    }
}
