import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';

class OrderController {
	async store(request, response) {
		// validacao do request
		const Schema = yup.object({
			product: yup.array().of(
				yup.object({
					id: yup.number().required(),
					quantity: yup.number().required(),
				}),
			),
		});
		try {
			Schema.validateSync(request.body, { abortEarly: false, strict: true });
		} catch (err) {
			return response.status(400).json({ erro: err.errors });
		}

		const { userId, userName } = request;
		const { products } = request.body;

		const arrayIdProduct = products.map((product) => product.id);

		const findedProduct = await Product.findAll({
			where: {
				id: arrayIdProduct,
			},
			include: {
				model: Category,
				as: 'categories',
				attributes: ['name_category'],
			},
		});

		const mapedProducts = findedProduct.map((product) => {
			const quantity = products.find((p) => p.id === product.id).quantity;
			const Products = {
				id: product.id,
				name: product.name,
				price: product.price,
				url: product.url,
				category: product.categories.name_category,
				quantity,
			};

			return Products;
		});

		// somar precos e enviar total a pagar
		const sumPrice = mapedProducts.reduce((total, value) => {
			return total + value.price * value.quantity;
		}, 0);

		const order = {
			user: {
				id: userId,
				name: userName,
			},
			products: mapedProducts,
			paymentprice: sumPrice,
			status: 'Pedido Realizado com sucesso!',
		};

		const newOrder = await Order.create(order);

		return response.status(201).json(newOrder);
	}
	/////////////////////////////////////////////////////////////////////
}

export default new OrderController();
