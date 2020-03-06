module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        price: dataTypes.INTEGER,
        image: dataTypes.STRING, // que debe devolver para que muestre la imagen
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
        /*
        Product.belongsTo(models.Colors, {
            as: 'colors',
            foreignKey: 'colors_id'
        });

*/
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

        Product.belongsToMany(models.Colors, {
            as: 'colors',
            through: 'colors_product',
            foreignKey: 'product_id',
            otherKey: 'colors_id'
        });

        Product.belongsToMany(models.Sizes, {
            as: 'sizes',
            through: 'size_product',
            foreignKey: 'product_id',
            otherKey: 'size_id'
        });


    }

    return Product;
}