import CatSuperintendenciaController from '../controllers/catSuperintendenciaController';
import { Router, Request, Response } from "express";

const catSuperintendenciaRouter = Router()
const catSuperintendenciaController = new CatSuperintendenciaController()

catSuperintendenciaRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catSuperintendenciaController.createCatSuperintendencia(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catSuperintendenciaRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catSuperintendenciaController.getCatSuperintendencias()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catSuperintendenciaRouter;
