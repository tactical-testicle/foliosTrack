import UserController from '../controllers/userController';
import { Router, Request, Response } from "express";

const userRouter = Router()
const userController = new UserController()

userRouter.post('/create', async (req: Request, res: Response): Promise<any> => {
    try{
        
        const isAdmin= req.body.user_client
        const body = req.body
        console.log("body recibido: ", body);
        const response = await userController.createUser(body,isAdmin)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

userRouter.get('/reads', async(req:Request, res: Response): Promise<any> => {
        try{
            const token = req.headers.authorization
        const response = await userController.getUsers(token)
        return res.status(response.code).json(response)
    }catch(err: any){
        return res.status(err.code ? err.code : 500)
    }
})

userRouter.get('/read', async(req:Request, res: Response): Promise<any> => {
    try{
        const body = req.body
    const response = await userController.getUserById(body.ficha)
    return res.status(response.code).json(response)
}catch(err: any){
    return res.status(err.code ? err.code : 500)
}
})

userRouter.post('/update', async(req:Request, res: Response): Promise<any> => {
    try{
    const body = req.body
    console.log("body recibido: ", body);
    const response = await userController.updateUser(body)
    return res.status(response.code).json(response)
}catch(err: any){
    return res.status(err.code ? err.code : 500)
}
})

userRouter.post('/delete', async(req:Request, res: Response): Promise<any> => {
    try{
    const {_id} = req.body
    console.log("body recibido: ", _id);
    const token = req.headers.authorization
    const response = await userController.deleteUser(_id, token)
    return res.status(response.code).json(response)
}catch(err: any){
    return res.status(err.code ? err.code : 500)
}
})
export default userRouter;
