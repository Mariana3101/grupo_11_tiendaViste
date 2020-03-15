module.exports = (sequelize, dataTypes) => {
    const Colors = sequelize.define('Colors', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    });


    return Colors;
}