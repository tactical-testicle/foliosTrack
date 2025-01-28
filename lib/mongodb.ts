import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'
export default class MongoConn {

    private static _instance: MongoConn | null = null;
    private connection: mongoose.Connection | null = null;

    private constructor() { } // Private constructor

    public static getInstance(): MongoConn {
        if (MongoConn._instance === null) {
            MongoConn._instance = new MongoConn();
        }
        return MongoConn._instance;
    }

    public async connectDB() {
        if(!this.connection){
            mongoose.set('strictQuery', false); 
            mongoose.set('bufferCommands', true);
            try {
                await mongoose.connect(`${config.get('mongodb.url')}/${config.get('mongodb.database')}`);
                logger.info(`Connected to database ${config.get('mongodb.database')}`);
            } catch (err) {
                logger.error(`Error connecting to database: ${err}`);
            }
        }
    }
    public async disconnectDB() {
        if(this.connection){
            try {
                await mongoose.connection.close();
                logger.info(`disconnected to database ${config.get('mongodb.database')}`);
    
            } catch (err) {
                logger.error(`Error connecting to database: ${err}`);
            }
        }
    }
}