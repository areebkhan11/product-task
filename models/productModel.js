const knex = require('../db/knex.js');

const listAllProducts = async () => {
    const data = await knex.raw(`SELECT * FROM "product";`);
    return data.rows;
}

const getSingleProduct = async(id) =>{
  
    const data = await knex.raw(`SELECT * FROM product WHERE  product_id = '${id}'`);
    return data.rows;
}

const updateProduct = async (product) =>{
    try {
        const updatedProduct = await knex('product')
          .update({
            product_name: product.product_name,
            quantity: product.quantity,
            price: product.price
          })
          .where('product_id', product.product_id)
          .returning('*');
        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error;
      }

}

module.exports = {
    listAllProducts,
    getSingleProduct,
    updateProduct
}