import * as restify from 'restify';
import { Router} from  '../common/router';
import { User } from './user.model';

class UserRouter extends Router{
    applyRoutes(application: restify.Server)
    {
        application.get('/users',(req,res,next)=>{
            User.find().then( user => {
                res.json(user);
                return next();
            });
        });

        application.get('/users/:id',(req,res,next)=>{
            
            User.findById(req.params.id).then(user => {
                if(user)
                {
                    res.json(user);
                    return next();
                }
            }).catch(err => {
                console.log(err);
                res.send(404);
                return next();
            })
        });
        application.post('/users',(req,res,next) => {
            let user = new User(req.body);
            user.save().then(user => {
                user.password = undefined;
                res.json(user); 
                return next();
            });
        });
    }
}


export const userRoutes = new UserRouter();