import CargaMasivaController from '../controllers/cargaMasivaController';
import { Router, Request, Response } from "express";
import fileUpload from 'express-fileupload';

const cargaMasivaRouter = Router()
const cargaMasivaController = new CargaMasivaController()

cargaMasivaRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No se ha cargado ningún archivo.' });
        }

        const file = req.files.file as fileUpload.UploadedFile;

        console.log("Archivo recibido: ", file);
        const response = await cargaMasivaController.createCargaMasiva(file);

        return res.status(response.code).json(response);
    } catch (err: any) {
        console.error(err);
        return res.status(err.code ? err.code : 500).json({ message: err.message });
    }
});
export default cargaMasivaRouter;