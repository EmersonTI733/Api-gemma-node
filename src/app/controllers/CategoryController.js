import { v4 } from 'uuid';
import Category from './../models/Category.js';
import * as yup from 'yup';

class CategoryController {
	async store(request, response) {
		// validacao do request
		const Schema = yup.object({
			name_category: yup.string().required(),
			path: yup.string(),
		});

		try {
			Schema.validateSync(request.body, {abortEarly: false});
		} catch (err) {
			return response.status(400).json({ erro: err.errors });
		}
		// validacao do request

		 
		const { name_category} = request.body;
		const {filename} = request.file;

		

		try {
			const newcategory = await Category.create({
				name_category,
				pathphoto: filename,
			});
			
			return response.status(201).json({ protuto: newcategory });
		} catch (err) {
			return response.status(400).json({ erro: err.errors[0].message});
		}
	};
//////////////////////////////////////////////////////////////////////////////////////////
	async index(request, response){
		const category = await Category.findAll();

		return response.status(200).json(category);
	};
/////////////////////////////////////////////////////////////
	async update(request, response){
		// validacao do request
		const Schema = yup.object({
			name_category: yup.string(),
			path: yup.string(),
		});

		try {
			Schema.validateSync(request.body, {abortEarly: false});
		} catch (err) {
			return response.status(400).json({ erro: err.errors });
		}
		// validacao do request

		 
		const { name_category} = request.body;
		const { id } = request.params;
		

		let pathphoto;
		if(request.file){
			const { filename } = request.file;
			pathphoto= filename;
		}
		

		try {
			const newcategory = await Category.update({
					name_category,
					pathphoto,
				},
				{
					where:{
						id
					}
				}
			);
			
			return response.status(201).json({ protuto: newcategory });
		} catch (err) {
			return response.status(400).json({ erro: 'verify data!'});
		}
	}

}

export default new CategoryController();
