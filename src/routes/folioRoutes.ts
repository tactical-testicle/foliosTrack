import FolioController from '../controllers/folioController';
import { Router, Request, Response } from "express";

const folioRouter = Router()
const folioController = new FolioController()

folioRouter.post('/create', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const {myForm} = req.body
        const token = req.headers.authorization
        console.log("body recibido: ", myForm);
        const response = await folioController.createFolio(myForm, token)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

folioRouter.get('/read', async(req:Request, res: Response): Promise<any> => {
        try{
        const token = req.headers.authorization
        const response = await folioController.getFolios(token)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

folioRouter.post('/update', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await folioController.updateFolio(body)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

folioRouter.post('/delete', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const body = req.body
        console.log("body recibido: ", body);
        const response = await folioController.deleteFolio(body)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

folioRouter.get('/:id',async(req: Request, res: Response):Promise<any> => {
    try{
        const {id}  = req.params
        const resp = await folioController.getFolioId(id)
        console.log(resp)
    }catch(error: any){
        return res.status(error.code ? error.code : 500).json(error)
    }
})
export default folioRouter;
