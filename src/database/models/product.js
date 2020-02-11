module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        price: dataTypes.INTEGER,
        image: dataTypes.STRING,
        user_id: dataTypes.INTEGER,

    });

    Product.associate = (models) => {


        Product.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'user_id'
        });

        Product.belongsToMany(models.Categories, {
            as: 'categories',
            through: 'category_product',
            foreignKey: 'product_id',
            otherKey: 'category_id'
        });

        Product.belongsToMany(models.Color, {
            as: 'color',
            through: 'color_product',
            foreignKey: 'product_id',
            otherKey: 'color_id'
        });
    }

    return Product;
}