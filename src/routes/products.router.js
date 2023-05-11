import {Router} from "express";
const router = Router();
import ProductManager from "../manager/ProductManager.js";
const productManager = new ProductManager('./products.json');


router.get ('/', async(res,req)=> {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({massage: error.massage});
        console.log(error);
    }
});

router.get('/:id', async(res,req)=>{
    try {
        const {id} = req.params;
        const product = await productManager.getProductById(Number(id));
        if(product){
            res.status(200).json({massage: 'Product found', product});
        } else {
            res.status(404).send('Product Not Found');
        }
    } catch (error) {
        res.status(404).json({ massage: error.massage});        
    }
})


router.put('/:id', async(req, res) =>{
    try {
        const product = req.body;
        const {id} = req.params;
        const productFile = await productManager.getProductById(product, Number(id));
        if(productFile){
            await productManager.updateProduct(product, Number(id));
            res.send(`product updated`);
        }else{
            res.status(404).send('product not found');
        }

    } catch (error) {
        res.status(404).json({massage: error.massage});
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const{id} = req.params;
        const products = await productManager.getProducts();
        if(products.length > 0){
            await productManager.deleteProduct(Number(id));
            res.send(`product id: ${id} deleted successfully`)
        } else{
            res.send(`product id: ${id} not found`);
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.delete('/', async(req, res)=>{
    try {
        await productManager.deleteAllProdcuts();
        res.send('products deleted successfully');
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})

export default router;