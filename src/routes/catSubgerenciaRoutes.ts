import CatSubgerenciaController from '../controllers/catSubgerenciaController';
import { Router, Request, Response } from "express";

const catSubgerenciaRouter = Router()
const catSubgerenciaController = new CatSubgerenciaController()

catSubgerenciaRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catSubgerenciaController.createCatSubgerencia(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catSubgerenciaRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catSubgerenciaController.getCatSubgerencias()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catSubgerenciaRouter;
