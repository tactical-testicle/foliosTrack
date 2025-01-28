import IUser from '../interfaces/user.interface';
//import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'
import JWTUtil from '../utils/jwt.util';
import { ObjectId } from 'mongoose';


export default class UserController {
    private userService: UserService
    private encription: Encription
    private jwtUtil: JWTUtil
    constructor() {
        this.userService = new UserService
        this.encription = new Encription
        this.jwtUtil = new JWTUtil()
    }


    // Crear un usuario
    async createUser(body: IUser, isAdmin: any): Promise<IResponse> {
        try {

            // if(isAdmin.role !== 'ADMIN'){
            //     return {ok: false, message: 'You are not Administrator', response: null, code: 500}

            // }
            const exist = await this.userService.getUser(body.ficha)
            console.log("exist: ", exist)
            if (exist) {
                return { ok: false, message: 'Ficha al readi exist', response: null, code: 500 }
            }

            const { iv, encryptedData } = await this.encription.encryptPassword(body.password)
            body.salt = iv
            body.password = encryptedData

            console.log("Ya va a crearlo.")
            const response = await this.userService.createUser(body)

            return { ok: true, message: 'Successfull', response: response, code: 200 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    // Modificar un usuario =)
    async updateUser(body: Partial<IUser>): Promise<IResponse> {
        try {
            console.log("Iniciando la actualización.");
            body.fechaActualizacion = new Date()
            const updatedUser = await this.userService.updateUser(body);
            console.log("Se actualizo: F-", body.ficha);
            return { ok: true, message: 'Updated successfully', response: updatedUser, code: 200 };
        } catch (err) {
            return { ok: false, message: 'Error occurred', response: err, code: 500 };
        }
    }

    // Borrado logico de un usuario
    async deleteUser(id: string, token: any): Promise<IResponse> {
        try {
            const user = await this.jwtUtil.decodeToken(token) as any
            const infoUser = await this.userService.getUserId(id) as any

            infoUser.status === 'inactive'
            ?    infoUser.status = 'active'
            :
                infoUser.status = 'inactive'
            

            infoUser.fechaActualizacion = new Date()
            infoUser.usuarioActualizacion = infoUser.ficha
            const response = await this.userService.updateUser(infoUser)

            console.log("El usuario: F-", infoUser.ficha, " ", infoUser.status," al F-", infoUser.ficha)
            return { ok: true, message: 'Successfull', response: response, code: 200 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    // Obtener todos los usuarios
    async getUsers(token: any): Promise<IResponse> {
        try {
            const user = await this.jwtUtil.decodeToken(token) as any
            const response = await this.userService.getUsers(user.id)
            return { ok: true, message: 'Successfull', response: response, code: 201 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    // obtener un usuario
    async getUserById(idUser: number): Promise<IResponse> {
        try {
            const response = await this.userService.getUser(idUser)
            if (!response) {
                return { ok: false, message: 'incorrect data', response: null, code: 201 }
            }
            return { ok: true, message: 'Successfull', response: response, code: 201 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }
}
