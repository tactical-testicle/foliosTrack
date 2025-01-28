import CatRemitenteController from '../controllers/catRemitenteController';
import { Router, Request, Response } from "express";

const catRemitenteRouter = Router()
const catRemitenteController = new CatRemitenteController()

catRemitenteRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catRemitenteController.createCatRemitente(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catRemitenteRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catRemitenteController.getCatRemitentes()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catRemitenteRouter;
