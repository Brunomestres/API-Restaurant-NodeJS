import * as restify from 'restify';
import { Router} from  '../common/router';
import { User } from './user.model';

class UserRouter extends Router{
    applyRoutes(application: restify.Server)
    {
        application.get('/users',(req,res,next)=>{
            User.findAll().then( user => {
                res.json(user);
                return next();
            });
        });
    }
}


export const userRoutes = new UserRouter();