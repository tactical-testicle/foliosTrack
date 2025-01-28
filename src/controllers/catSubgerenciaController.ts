import ICatSubgerencia from '../interfaces/catSubgerencia.interface';
//import bcrypt from 'bcrypt';
import CatSubgerenciaService from '../services/catSubgerencia.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'

export default class CatSubgerenciaController {
    private catSubgerenciaService: CatSubgerenciaService
    private encription: Encription
    constructor() {
        this.catSubgerenciaService = new CatSubgerenciaService
        this.encription = new Encription
    }


    async createCatSubgerencia(body: ICatSubgerencia): Promise<IResponse> {
        try {

            console.log("Ya va a crearlo.")            
            const response = await this.catSubgerenciaService.createCatSubgerencia(body)
            return { ok: true, message: 'Successfull', response: response, code: 200 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }

    async getCatSubgerencias(): Promise<IResponse> {
        try {
            const response = await this.catSubgerenciaService.getCatSubgerencias()
            return { ok: true, message: 'Successfull', response: response, code: 201 }
        } catch (err) {
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        }
    }
}
