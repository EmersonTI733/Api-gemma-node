module.exports = {
	dialect: 'mysql',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 3306,
	username: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '1234',
	database: process.env.DB_NAME || 'api-for-restaurant',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
