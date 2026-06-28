import { v4 } from 'uuid';
import User from '../models/User.js';
import * as yup from 'yup';
import bcrypt from 'bcrypt'

// metodos:
// store -> cria dado,
// index -> lista todos os dados,
// show -> lista um dado,
// update -> atualiza dados,
// delete -> remove dado

class UserController {
	async store(request, response) {
		try {
			// validacao do request
			const Schema = yup.object({
				name: yup.string().required(),
				email: yup.string().email().required(),
				password: yup.string().min(4).required(),
				admin: yup.bool().required(),
			});
			try{
				Schema.validateSync(request.body, {abortEarly:false, strict:true});
			}catch(_err){
				return response.status(400).json({message:'Digite dados validos!'});
			}
			// validacao do request

			
			const { name, email, password, admin } = request.body;
			// hash de senha com bcrypt
			const password_hash= await bcrypt.hash(password, 10);

			const usercreate = await User.create({
				id: v4(),
				name,
				email,
				password_hash,
				admin,
			});
			return response.status(201).json({
				id: usercreate.id,
				name: usercreate.name,
				admin: usercreate.admin,
			});
		} catch (_err) {
			return response.status(400).json({message:'Digite dados validos!1'});
		}
	}
}

export default new UserController();
