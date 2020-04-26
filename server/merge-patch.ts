import * as restify from 'restify';

const mpContentType = 'application/merge-patch+json';


export const mergePatch = (req: restify.Request,res: restify.Response,next:restify.Next) => {
    if(req.getContentType() === mpContentType && req.method === 'PATCH')
    {
        (<any>req).rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        } catch (error) {
            return next(new Error(error.message));
        }

    }
    return next();
}