import CatGerenciaController from '../controllers/catGerenciaController';
import { Router, Request, Response } from "express";

const catGerenciaRouter = Router()
const catGerenciaController = new CatGerenciaController()

catGerenciaRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catGerenciaController.createCatGerencia(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catGerenciaRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catGerenciaController.getCatGerencias()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catGerenciaRouter;
