module.exports = (sequelize, dataTypes) => {
    const Size = sequelize.define('Sizes', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    });


    return Size;
}