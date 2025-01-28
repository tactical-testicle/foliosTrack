import IFolio from '../interfaces/folio.interface';
import FolioService from '../services/folio.service';
import Encription from "../utils/encryption.util";
import IResponse from '../interfaces/response.interface'
import JWTUtil from '../utils/jwt.util';
import CatGerenciaService from '../services/catGerencia.services';
import CatSubgerenciaService from '../services/catSubgerencia.service';
import CatSuperintendenciaService from '../services/catSuperintendencia.service';
import CatFolioService from '../services/catFolio.service';
import UserService from '../services/user.service'
import mongoose, { Types } from 'mongoose';
import { Console } from 'console';



export default class FolioController {
    private folioService: FolioService
    private encription: Encription
    private jwtUtil: JWTUtil
    private catGerencia: CatGerenciaService
    private catSubgerencia: CatSubgerenciaService
    private catSuperintendencia: CatSuperintendenciaService
    private catFolio: CatFolioService
    private userService: UserService
    constructor(){
        this.folioService = new FolioService
        this.encription = new Encription
        this.jwtUtil = new JWTUtil()
        this.catGerencia = new CatGerenciaService
        this.catSubgerencia = new CatSubgerenciaService
        this.catSuperintendencia = new CatSuperintendenciaService
        this.catFolio = new CatFolioService
        this.userService = new UserService()
    }


async createCargaMasiva(filePath: any):Promise<IResponse>{
    try{
        const response = await this.folioService.bulkUploadFromCSV(filePath)
        console.log(response)
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}
}
