module.exports = (sequelize, dataTypes) => {
    const Categories = sequelize.define('Categories', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    });



    return Categories;
}