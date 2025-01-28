import CatDestinatarioController from '../controllers/catDestinatarioController';
import { Router, Request, Response } from "express";

const catDestinatarioRouter = Router()
const catDestinatarioController = new CatDestinatarioController()

catDestinatarioRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catDestinatarioController.createCatDestinatario(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catDestinatarioRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catDestinatarioController.getCatDestinatarios()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catDestinatarioRouter;
