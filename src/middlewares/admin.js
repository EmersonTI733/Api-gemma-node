
const adminMiddleware = (request, response, next)=>{
    const IsAdmin = request.userIsAdmin;

    if(!IsAdmin){
        return response.status(401).json();
    }

    return next();
};



export default adminMiddleware;