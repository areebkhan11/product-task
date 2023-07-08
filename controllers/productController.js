const productModel = require('../models/productModel.js');

const getProducts = async (req, res) => {
    const products = await productModel.listAllProducts();
    res.status(200).send(products);
}

const getSingleProduct = async (req, res) =>{
    try{
        const id = req.params.id
        const product = await productModel.getSingleProduct(id);
        if(product.length === 0){
            return res.status(400).send({
                status: 400,
                data: null,
                error: "Product not found",
              });
        }else{
            return res.status(200).send({
                status: 200,
                data: product[0],
                error: null,
              });
        }
    }catch(error){
        return res.status(400).send({
            status: 400,
            data: null,
            error: error.message,
          });
    }
}

const updateProduct = async (req,res) =>{
    try{
        const id = req.params.id
        const product = await productModel.getSingleProduct(id);
        if(product.length === 0){
            return res.status(400).send({
                status: 400,
                data: null,
                error: "Product not found",
              });
        }else{
            const body = {...req.body, product_id:product[0].product_id}
            console.log(body, "<----body")
            const updateProduct = await productModel.updateProduct(body);
            console.log(updateProduct, "<---updateProduct")
            if(updateProduct.length === 0){
                return res.status(400).send({
                    status: 400,
                    data: null,
                    error: "Product not found",
                  });
            }else{

                return res.status(200).send({
                    status: 200,
                    data: product[0],
                    error: null,
                  });
            }


        }
    }catch(error){
        return res.status(400).send({
            status: 400,
            data: null,
            error: error.message,
          });
    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    updateProduct
}