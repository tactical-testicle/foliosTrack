import { ObjectId } from "mongoose"

export default class FoliosUtils {
    
    constructor(){

    }

    async arrayDestinatarios(destinatarios: any) {
        try{
            const ids: string[] = destinatarios.map((destinatario: { id: ObjectId }) => destinatario.id )
            return ids
        }catch(error){
            return false 
        }
    }
}