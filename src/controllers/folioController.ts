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
import FoliosUtils from '../utils/folios.util';



export default class FolioController {
    private folioService: FolioService
    private jwtUtil: JWTUtil
    private catGerencia: CatGerenciaService
    private catSubgerencia: CatSubgerenciaService
    private catSuperintendencia: CatSuperintendenciaService
    private catFolio: CatFolioService
    private userService: UserService
    private folioUtil: FoliosUtils
    constructor(){
        this.folioService = new FolioService
        this.jwtUtil = new JWTUtil()
        this.catGerencia = new CatGerenciaService
        this.catSubgerencia = new CatSubgerenciaService
        this.catSuperintendencia = new CatSuperintendenciaService
        this.catFolio = new CatFolioService
        this.userService = new UserService()
        this.folioUtil = new FoliosUtils()
    }


// Crear un folio
async createFolio(body: IFolio, token: any):Promise<IResponse>{
    try{
       
        const listIds = await this.folioUtil.arrayDestinatarios(body.destinatarios)
        if(!listIds){
            return { ok: false, message: 'Invalid destinatarios', response: null, code: 400 };
        }
        body.destinatarios = listIds
        // Revisar que aun no exista repetido noAcuerdosGESSM
        const auxCount = await this.folioService.getExisteNoAcuerdo(body.noAcuerdosGESSM)

        if (auxCount > 0)
            return {ok: false, message: 'Número de acuerdo duplicado', response: null, code: 208}

        const user = await this.jwtUtil.decodeToken(token) as any
        const infoUser = await this.userService.getUser(user.ficha) as any
        const infoSubgherencia = await this.catSubgerencia.getCatSubgerencia(infoUser.subgerencia)
        const infoGerencia = await this.catGerencia.getCatGerencia(infoUser.gerencia)
        const infoSuperintendencia = await this.catSuperintendencia.getCatSuperintendencia(infoUser.superintendencia)        
        
        const objectId = body.tipoFolio;
        const idString = objectId.toString();
        const count = await this.folioService.getFolioConsecutivo(idString)
        body.noConsecutivo = count + 1 ;
        console.log("usuario en linea: ", user)
        body.usuarioCreacion = user.ficha;
        body.rubricasElaboracion = user.rubrica;
        
        // Crear nombre de Oficio debendiendo si es tarjeta u oficio
        const catFolioObj = await this.catFolio.getCatFolio(idString) 
        
        console.log('servicio',body)
        if (catFolioObj.nombre == "OFICIO")
            body.noOficio = "DAS-"+ infoGerencia.siglas +"-"+infoSubgherencia.siglas+"-"+infoSuperintendencia.siglas+"-"+body.noConsecutivo+"-"+new Date().getFullYear().toString()        
        else 
        body.noOficio = "TARJETA-"+infoGerencia.siglas+(infoSubgherencia ? ("-"+infoSubgherencia.siglas):'')+(infoSuperintendencia ? ("-"+infoSuperintendencia.siglas+"-"):'-')+body.noConsecutivo+"-"+new Date().getFullYear().toString()        
    
        const response = await this.folioService.createFolio(body)   
        return {ok: true, message:'Successfull', response: body.noOficio, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

// Modificar un folio =)
async updateFolio(body: Partial<IFolio>): Promise<IResponse> {
    try {
        console.log("Iniciando la actualización.");
        body.fechaActualizacion = new Date()        
        const updatedFolio = await this.folioService.updateFolio(body);
        console.log("Se actualizo: ", body.noOficio);
        return { ok: true, message: 'Updated successfully', response: updatedFolio, code: 200 };
    } catch (err) {
        return { ok: false, message: 'Error occurred', response: err, code: 500 };
    }
}


// Borrado logico de un folio
async deleteFolio(body: IFolio):Promise<IResponse>{
    try{
        console.log("Ya va a borrar logicamente.")
        body.status = "inactive"
        body.fechaActualizacion = new Date()        
        const response = await this.folioService.updateFolio(body)   
        console.log("ya quedo borrado logicamnte: ",body.noOficio)     
        return {ok: true, message:'Successfull', response: response, code: 200}
    }catch(err){
        return {ok: false, message: 'Error ocurred', response: err, code: 500}
    }
}

// Obtener todos los folios
async getFolios(token: any):Promise<IResponse>{
    try{
        const user = await this.jwtUtil.decodeToken(token) as any
        const infoUser = await this.userService.getUser(user.ficha) as any
        let response = null
        console.log("El usuario tiene el rol: ",infoUser.role)
        if (infoUser.role != "ADMIN")
            response = await this.folioService.getFoliosFicha(infoUser.ficha)
        else
            response = await this.folioService.getFolios()
        console.log(response)
        return {ok: true, message: 'Successfull', response: response, code: 201}
    }catch(err){
        return {ok: false,  message: 'Error ocurred', response: err, code: 500}
    }
}

async getFolioId(idFolio: string):Promise<IResponse>{
    try{
        console.log(idFolio)
        return {ok: true, message: 'Successfull', response: null, code: 201}
    }catch(error){
        return {ok: false,  message: 'Error ocurred', response: error, code: 500}
    }
}
}
