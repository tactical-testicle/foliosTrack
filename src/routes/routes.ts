import express from 'express'
import userRouter from './userRoutes'
import folioRouter from './folioRoutes'
import catFolioRouter from './catFolioRoutes'
import catGerenciaRouter from './catGerenciaRoutes'
import catSubgerenciaRouter from './catSubgerenciaRoutes'
import catSuperintendenciaRouter from './catSuperintendenciaRoutes'
import catPuestoRouter from './catPuestoRoutes'
import catDestinatarioRouter from './catDestinatarioRoutes'
import catRemitenteRouter from './catRemitenteRoutes'
import cargaMasivaRouter from './cargaMasivaRoutes'
import authRouter from './authRoutes'

const routers = express()

routers.use('/api/user',userRouter)
routers.use('/api/folio', folioRouter)
routers.use('/api/auth', authRouter)

// catalogos
routers.use('/api/catFolio', catFolioRouter)
routers.use('/api/catGerencia', catGerenciaRouter)
routers.use('/api/catSubgerencia', catSubgerenciaRouter)
routers.use('/api/catSuperintendencia', catSuperintendenciaRouter)
routers.use('/api/catPuesto', catPuestoRouter)
routers.use('/api/catDestinatario', catDestinatarioRouter)
routers.use('/api/catRemitente', catRemitenteRouter)

// carga
routers.use('/api/cargaMasiva', cargaMasivaRouter)

export default routers