import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name_category: Sequelize.STRING,
				pathphoto: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `http://localhost:3000/category-file/${this.pathphoto}`;
					},
				},
			},
			{
				sequelize,
				tableName: 'category',
			},
		);

		return this;
	}
}

export default Category;
