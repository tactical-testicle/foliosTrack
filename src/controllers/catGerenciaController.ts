import ICatGerencia from '../interfaces/catGerencia.interface';
//import bcrypt from 'bcrypt';
import CatGerenciaService from '../services/catGerencia.services';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'

export default class CatGerenciaController {
    private catGerenciaService: CatGerenciaService
    private encription: Encription
    constructor(){
        this.catGerenciaService = new CatGerenciaService
        this.encription = new Encription
    }


async createCatGerencia(body: ICatGerencia):Promise<IResponse>{
    try{
      
        console.log("Ya va a crearlo.")
        
        const response = await this.catGerenciaService.createCatGerencia(body)
        return {ok: true, message:'Successfull', response: response, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

async getCatGerencias():Promise<IResponse>{
    try{
        const response = await this.catGerenciaService.getCatGerencias()
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}
}
