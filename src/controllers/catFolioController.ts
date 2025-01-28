import ICatFolio from '../interfaces/catFolio.interface';
//import bcrypt from 'bcrypt';
import CatFolioService from '../services/catFolio.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'



export default class CatFolioController {
    private catFolioService: CatFolioService
    private encription: Encription
    constructor(){
        this.catFolioService = new CatFolioService
        this.encription = new Encription
    }


// Crear un usuario
async createCatFolio(body: ICatFolio):Promise<IResponse>{
    try{
      
        console.log("Ya va a crearlo.")
        const response = await this.catFolioService.createCatFolio(body)
        
        return {ok: true, message:'Successfull', response: response, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

// Obtener todos los usuarios
async getCatFolios():Promise<IResponse>{
    try{
        const response = await this.catFolioService.getCatFolios()
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}
}
