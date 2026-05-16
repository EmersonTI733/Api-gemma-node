import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            category_id: Sequelize.STRING,
            path: Sequelize.STRING,
            //aqui eu criei um campo virtual que nao sera salvo no banco
            url: {
                type: Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3000/product-file/${this.path}`;
                }
            }
        },
        {
            sequelize,
            tableName: 'products',
        }
    );

    return this;
	}

    static associate(models){
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'categories', 
        });
    }
    
}

export default Product;
