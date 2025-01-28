import CatPuestoController from '../controllers/catPuestoController';
import { Router, Request, Response } from "express";

const catPuestoRouter = Router()
const catPuestoController = new CatPuestoController()

catPuestoRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        const body = req.body
        const response = await catPuestoController.createCatPuesto(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catPuestoRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catPuestoController.getCatPuestos()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catPuestoRouter;
