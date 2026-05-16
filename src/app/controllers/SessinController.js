import User from '../models/User.js';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import authconfig from '../../config/auth.js'
import jwt from 'jsonwebtoken';

class SessionController {
	async store(request, response) {
		try {
			const validSchema = yup.object({
				email: yup.string().email().required(),
				password: yup.string().min(4).required(),
			});
            const datavalid = await validSchema.isValid(request.body, {strict:true});
            if(!datavalid){
                return response.status(400).json({message:'check data'});
            }

			const { email, password } = request.body;
            const verifyUser = await User.findOne({
                where:{
                    email,
                }
            });

            const verifyPassword = await bcrypt.compare(password, verifyUser.password_hash);
            if(!verifyPassword){
                return response.status(400).json({message:'check data'});
            }

            //gerando token para login
            const token = jwt.sign(
                {id: verifyUser.id, admin: verifyUser.admin},//dados de payload
                authconfig.secret,//palavra secreta
                {expiresIn: authconfig.expiresIn}//data de expiracao
            );

			return response.status(200).json({user:{
                id:verifyUser.id,
                name:verifyUser.name,
                email:verifyUser.email,
                admin:verifyUser.admin,
                token
            }});
		} catch (err) {
            console.log(err)
			return response.status(400).json({message:'check data'});
		}
	}
}

export default new SessionController();
