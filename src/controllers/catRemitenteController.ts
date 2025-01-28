import ICatRemitente from '../interfaces/catRemitente.interface';
//import bcrypt from 'bcrypt';
import CatRemitenteService from '../services/catRemitente.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'



export default class CatRemitenteController {
    private catRemitenteService: CatRemitenteService
    private encription: Encription
    constructor(){
        this.catRemitenteService = new CatRemitenteService
        this.encription = new Encription
    }


// Crear un remitente
async createCatRemitente(body: ICatRemitente):Promise<IResponse>{
    try{
      
        console.log("Ya va a crearlo.")
        const response = await this.catRemitenteService.createCatRemitente(body)
        
        return {ok: true, message:'Successfull', response: response, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

// Obtener todos los remitentes
async getCatRemitentes():Promise<IResponse>{
    try{
        const response = await this.catRemitenteService.getCatRemitentes()
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}
}
