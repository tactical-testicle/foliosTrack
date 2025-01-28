import express from 'express'
import cors from 'cors'
import Server from './classes/server.class'
import routers from './routes/routes';
import fileUpload from 'express-fileupload';

const server = Server.instance

server.app.enable('trust proxy')


server.app.use(express.urlencoded({extended: true, limit: '50mb'}))
server.app.use(express.json({ limit: '50mb'}))
server.app.use(fileUpload({ 
    limits: { fileSize: 50 * 1024 * 1024 }, 
    useTempFiles: true, 
    tempFileDir: '/tmp/' 
}));

server.app.use(cors({origin: 'http://localhost:5173', credentials: true}))

server.app.use(routers);
server.start()