module.exports = (sequelize, dataTypes) => {
    const Colors = sequelize.define('Colors', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    });
    Colors.associate = (models) => {
        Colors.belongsToMany(models.Products, {
            as: 'products',
            through: 'colors_product',
            foreignKey: 'colors_id',
            otherKey: 'product_id'
        });
    }

    return Colors;
}