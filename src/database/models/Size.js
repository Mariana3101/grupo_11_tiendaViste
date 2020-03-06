module.exports = (sequelize, dataTypes) => {
    const Size = sequelize.define('Sizes', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    });
    Size.associate = (models) => {
        Size.belongsToMany(models.Products, {
            as: 'products',
            through: 'size_product',
            foreignKey: 'size_id',
            otherKey: 'product_id'
        });
    }

    return Size;
}