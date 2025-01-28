import ICatDestinatario from '../interfaces/catDestinatario.interface';
//import bcrypt from 'bcrypt';
import CatDestinatarioService from '../services/catDestinatario.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'

export default class CatDestinatarioController {
    private catDestinatarioService: CatDestinatarioService
    private encription: Encription
    constructor() {
        this.catDestinatarioService = new CatDestinatarioService
        this.encription = new Encription
    }


    async createCatDestinatario(body: ICatDestinatario): Promise<IResponse> {
        try {

            console.log("Ya va a crearlo.")            
            const response = await this.catDestinatarioService.createCatDestinatario(body)
            return { ok: true, message: 'Successfull', response: response, code: 200 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    async getCatDestinatarios(): Promise<IResponse> {
        try {
            const response = await this.catDestinatarioService.getCatDestinatarios()
            return { ok: true, message: 'Successfull', response: response, code: 201 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }
}
