import { v4 } from 'uuid';
import Product from './../models/Product.js';
import * as yup from 'yup';
import Category from '../models/Category.js';

class ProductController {
	async store(request, response) {
		// validacao do request
		const Schema = yup.object({
			name: yup.string().required(),
			price: yup.number().integer().required(),
			path: yup.string(),
			category_id: yup.number().required(),
		});
		try {
			Schema.validateSync(request.body, {abortEarly: false});
		} catch (err) {
			return response.status(400).json({ erro: err.errors });
		}
		// validacao do request
		const { name, price, category_id } = request.body;
		const {filename} = request.file;


		try {
			const products = await Product.create({
				name,
				price,
				path: filename,
				category_id,
			});
			return response.status(201).json({ protuto: products });
		} catch (err) {
			return response.status(400).json({ erro: 'verify data!' });
		}
	}
///////////////////////////////////////////////////////////////////////////
	async index(request, response){
		try {
			const products = await Product.findAll({
			include:[{
				model: Category,
				as: 'categories',
				attributes:['id', 'name_category']
			}]
		});
		

		return response.status(200).json(products);
		} catch (error) {
			return response.status(500).json({message:'error server!'});
		}
	}
}

export default new ProductController();
