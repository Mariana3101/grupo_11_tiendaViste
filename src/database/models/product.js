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
        brand_id: dataTypes.INTEGER,
        size_id: dataTypes.INTEGER,
        category_id: dataTypes.INTEGER,
        colors_id: dataTypes.INTEGER,


    });

    Product.associate = (models) => {
        Product.belongsTo(models.Brands, {
            as: 'brand',
            foreignKey: 'brand_id'
        });

        Product.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'user_id'
        });

        Product.belongsTo(models.Sizes, {
            as: 'size',
            foreignKey: 'size_id'
        });



        Product.belongsTo(models.Colors, {
            as: 'colors',
            foreignKey: 'colors_id'
        });

        Product.belongsTo(models.Categories, {
            as: 'categories',
            foreignKey: 'category_id'
        });

    }

    return Product;
}