import ICatPuesto from '../interfaces/catPuesto.interface';
//import bcrypt from 'bcrypt';
import CatPuestoService from '../services/catPuesto.services';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'

export default class CatPuestoController {
    private catPuestoService: CatPuestoService
    private encription: Encription
    constructor(){
        this.catPuestoService = new CatPuestoService
        this.encription = new Encription
    }


async createCatPuesto(body: ICatPuesto):Promise<IResponse>{
    try{
        const response = await this.catPuestoService.createCatPuesto(body)
        return {ok: true, message:'Successfull', response: response, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

async getCatPuestos():Promise<IResponse>{
    try{
        const response = await this.catPuestoService.getCatPuestos()
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}
}
