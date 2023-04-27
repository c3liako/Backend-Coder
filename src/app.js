const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


const port = 8080;
const product = new ProductManager('./product.json');

app.listen(port, ()=>{
    console.log('App listenning on port http://localhost:${port}')
});

app.get("appi/products", async (req,res) => {
    try{
        let limit = req.query.limit;
        const products = await productManager.getProduct();
        if(!limit){
            return res.status(200).json(products)
        }
        limit = parseInt(limit)
        if (isNaN(limit)){
            throw new Error('Limit query has to be a valid number')
        }
        res.status(200).json(products.slice(0, limit))
    }catch (error){
        res.status(400).json({error: error.massage})
    }
});

app.get("api/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productManager.getProductsById(parseInt(id));
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

    

})