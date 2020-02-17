 module.exports = (sequelize, dataTypes) => {
     const Color_product = sequelize.define('Color_product', {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         product_id: dataTypes.INTEGER,
         colors_id: dataTypes.INTEGER,
     }, {
         tableName: 'colors_product'
     });

     return Color_product;
 };