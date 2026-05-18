import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (request, response, next)=>{
    const authtoken = request.headers.authorization;

    if(!authtoken){
        return response.status(401).json({error: 'token not provider'});
    }

    const token = authtoken.split(' ')[1];

    try {
        jwt.verify(token, authConfig.secret, (error, decoded)=>{
            if(error){
                throw Error();
            }
            request.userId = decoded.id; //criando este valor na request
            request.userIsAdmin = decoded.admin; //criando este valor na request
            request.userName = decoded.name;
        });

        return next();
    } catch (_error) {
        return response.status(401).json({error: 'token is invalid!'});
    }
};



export default authMiddleware;