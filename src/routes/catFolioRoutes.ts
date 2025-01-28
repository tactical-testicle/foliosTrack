import CatFolioController from '../controllers/catFolioController';
import { Router, Request, Response } from "express";

const catFolioRouter = Router()
const catFolioController = new CatFolioController()

catFolioRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await catFolioController.createCatFolio(body);        
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

catFolioRouter.get('/', async(req:Request, res: Response): Promise<any> => {
        try{
        const response = await catFolioController.getCatFolios()
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})
export default catFolioRouter;
