import fs from 'fs'
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./src/fs/products.json');

export default class CartManager{

    constructor (path){
        this.path = path; 
    }

    async readDataFile(){
        try {
            if (fs.existsSync(this.path)){
                const cartsString = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(cartsString);
            }
        } catch (error) {
            if (error.code === 'ENOENT'){
                console.log('File not Found!');
            }else{
                throw error;
            }
        }
    }

    async addCart(){
        try {
            let carts =await this.readDataFile();
            let id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
            carts.push({
                id,
                products: []
            });
            let newCart = carts.find((cId)=> cId.id=== id);
            const cartsString = JSON.stringify(carts, null, 2);
            await fs.promises.writeFile(this.path, cartsString);
            console.log('Cart created succesfully!');
        } catch (error) {
            throw new Error(error.massage);
        }
    }

    async getCartById(id){
        try {
            let carts = await this.readDataFile();
            let checkId = carts.find((cId)=> cId.id===id);
            if(!checkId){
                throw new Error('Invalid id, cart not found');
            }
            return checkId;
        } catch (error) {
            throw new Error(error.massage);
        }
    }

    async addProductToCart(productId, cartId){
        try {
            let carts = await this.readDataFile();
            let productsFile = await productManager.readDataFile()
            
            let checkPId = productsFile.find((pId)=>pId.id===productId);
            if(!checkPId){
                throw new Error ('Invalid id, product not found');
            }

            let foundCart = carts.find((c)=>c.id===cartId);
            if(foundCart){
                let foundProduct = foundCart.products.find((p)=> p.id===productId);
                if(foundProduct){
                    foundProduct.quantity += 1;
                }else{
                    foundCart.products.push({
                        id: productId,
                        quantity: 1,
                    });
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                console.log(`Product ${productId} added succesfully to cart ${cartId}`);
            }else{
                throw new Error('Invalid id');
            }
            
            
        } catch (error) {
            throw new Error (error.massage);
            
        }
    }

    async deleteCart(id){
        try {
            let carts = await this.readDataFile();
            let index = carts.findIndex((cId)=>cId.id===id);
            if(index===-1){
                throw new Error('Cannot delete. Not found');
            }else{
                carts.splice(index, 1);
            }
            const cartsString = JSON.stringify(carts);
            await fs.promises.writeFile(this.path, cartsString);
            console.log(`Cart ${id} deleted succesfully!`);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductFromCart(productId, cartId){
        try {
            let carts = await this.readDataFile();
            let productsFile = await productManager.readDataFile();

            let checkPId = productsFile.find((pId) => pId.id === productId);
            if (!checkPId) {
            throw new Error("Invalid id, product not found");
            }

            let findedCart = carts.find((c) => c.id === cartId);
            if (findedCart) {
                let findedProduct = findedCart.products.find((p) => p.id === productId);
                if (findedProduct) {
                        if(findedProduct.quantity === 1){
                            findedCart.products.splice(findedCart.products.indexOf(findedProduct), 1);
                        }else{
                        findedProduct.quantity -= 1;
                        }
                    } else {
                        throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`)
                        }
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                console.log(`Product ${productId} was deleted succesfully from cart ${cartId}`);
                } else {
                    throw new Error("Invalid id, cart not found");
                }
        } catch (error) {
            throw new Error(error.massage);
        }
    }
}
