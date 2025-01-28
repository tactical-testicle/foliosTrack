import logger from '../../lib/logger'
import IResponse from '../interfaces/response.interface';
import IUser from '../interfaces/user.interface';
import UserService from '../services/user.service'
import Encription from '../utils/encryption.util';
import JWTUtil from '../utils/jwt.util';

export default class AuthControll{
    private userService: UserService
    private encryption: Encription
    private jwtUtil: JWTUtil
    constructor(){
        this.userService = new UserService()
        this.encryption = new Encription()
        this.jwtUtil = new JWTUtil()
    }
    
    async Login(ficha: number, password: string):Promise<IResponse>{
        try{
            
            const user = await this.userService.getUser(ficha) as any
            if(!user){
                return {ok: false, message: 'Ficha or Password incorrect', response: null, code: 400}
            }
            console.log(user)
            if(user.status !== "active"){
                return {ok: false, message: 'Tu estado es inactivo habla con el Admin', response: null, code: 301}
            }
            const truePassword = await this.encryption.decryptPassword(user, password)
            if(!truePassword){
                return ({ ok: false, message: " password incorrect", response: null, code: 400 });

            }

            const frontUser = {
                id: user.id,
                name: user.name,
                ficha: user.ficha,
                role: user.role,
                status: user.status,
                gerencia: user.gerencia,
                subgerencia: user.subgerencia
            }

            const genToken = await this.jwtUtil.generateToken(frontUser)

            return {ok: true, message: 'Successfull', response: frontUser, code: 200, token:  genToken }
        }catch(err){
            logger.error(`[AuthControll/login] ${err}`)
            return {ok: false, message: 'Error ocurred',response: err, code: 500}
        }
    }

    async LoginRefresh(token: any):Promise<IResponse>{
        try{
            const data = await this.jwtUtil.decodeToken(token) as any
            if(!data){
                return {ok: false, message: 'Token invalido', response:null, code: 401 }
            }
            const user = await this.userService.getUser(data.ficha) as any
            if(!user){
                    return {ok: false, message: 'Usuario no encontrado', response:null, code: 401 }
                
            }
            const frontUser = {
                id: user.id,
                name: user.name,
                ficha: user.ficha,
                role: user.role,
                status: user.status
            }
            const tokenGen = await this.jwtUtil.generateToken(frontUser)
            return {ok: true, message: 'Successfull', response: null, code: 200,user: frontUser, token: tokenGen}

        }catch(err){
logger.error(`[AuthControll/LoginRefresh] ${err}`)
            return {ok: false, message: 'Error ocurred',response: err, code: 500}
        }
    }
}