 module.exports = (sequelize, dataTypes) => {
     const Size_product = sequelize.define('Size_product', {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         product_id: dataTypes.INTEGER,
         size_id: dataTypes.INTEGER,
     }, {
         tableName: 'size_product'
     });

     return Size_product;
 };