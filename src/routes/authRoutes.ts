import AuthController from '../controllers/auth.controller';
import Authenticate from '../middlewares/authenticate.middleware';
import { Router, Request, Response } from "express";

const authRouter = Router()
const authController = new AuthController()
const checkToken =  new Authenticate()

authRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        const body = req.body
        console.log("body recibido: ", body);
        const response = await authController.Login(body.ficha, body.password)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

authRouter.get('/',checkToken.autetication, async(req: Request, res: Response):Promise<any>=>{
    try{
        const token = req.headers.authorization
        const response = await authController.LoginRefresh(token)

        return res.status(response.code).json(response)
    }catch(error: any){
        return res.status(error.code ? error.code : 500).json(error)
    }
})
export default authRouter;