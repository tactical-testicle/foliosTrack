import ICatSuperintendencia from '../interfaces/catSuperintendencia.interface';
//import bcrypt from 'bcrypt';
import CatSuperintendenciaService from '../services/catSuperintendencia.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'

export default class CatSuperintendenciaController {
    private catSuperintendenciaService: CatSuperintendenciaService
    private encription: Encription
    constructor() {
        this.catSuperintendenciaService = new CatSuperintendenciaService
        this.encription = new Encription
    }


    async createCatSuperintendencia(body: ICatSuperintendencia): Promise<IResponse> {
        try {

            console.log("Ya va a crearlo.")            
            const response = await this.catSuperintendenciaService.createCatSuperintendencia(body)
            return { ok: true, message: 'Successfull', response: response, code: 200 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    async getCatSuperintendencias(): Promise<IResponse> {
        try {
            const response = await this.catSuperintendenciaService.getCatSuperintendencias()
            return { ok: true, message: 'Successfull', response: response, code: 201 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }
}
