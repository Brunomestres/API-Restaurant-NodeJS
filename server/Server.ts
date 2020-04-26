import * as restify from 'restify';
import * as mongoose from 'mongoose';
import { environment } from '../common/environment';
import { Router } from  '../common/router';
import { mergePatch } from './merge-patch';
export class Server{
    application : restify.Server;
    initRoutes(routers: Router[]): Promise<any>
    {
        return new Promise((resolve,reject)=>{
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatch);
                //Rotas
                
                for(let router of routers)
                {
                    router.applyRoutes(this.application);
                }

                this.application.listen(environment.server.port,()=>{
                    resolve(this.application);
                }); 

            } catch (error) {
                reject(error);
            }
        });
    }

    initializeDb()
    {
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        });
    }

    bootstrap(routers: Router[] = []): Promise<Server>
    {
        return this.initializeDb().then(()=>
            this.initRoutes(routers).then(()=> this)
        );
    }
}