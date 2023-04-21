
const { Console } = require('console');
const fs = require('fs');


class ProductManager{
    constructor(){
        this.path='./products.json';
        this.products = [];
        this.productId = 1;
    }

    async addProduct(product){

        const id = this.productId++
        product.id = id;
        await this.getProducts();
        this.products.push(product);
        await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8")


    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS;
            }else {
                return[] 
            }
        }catch (error){
            console.log(error)
        }
    }

    async getProductById(id){
        await this.getProducts();
        const product = this.products.find ((product) => product.id === id);
        if(!product){
            console.log(`Id : ${id} . Not Found`);
        }
        return product;
    }

    async updateProduct(id, updates){
        await this.getProducts();
        const productIdex = this.products.findIndex((product) => product.id === id);
        if (productIdex === -1){
            console.log(`Id : ${id} . Not Found`);
        }
        const updatedProduct = Object.assign ({}, this.products[productIdex], updates);
        this.products[productIdex] = updatedProduct;
        await fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
    }

    async deleteProduct(id){
        await this.getProducts();
        const productIndex = this.products.findIndex((product) => product.id ===id);
        if(productIndex===-1){
            console.log(`Id : ${id} . Not Found`);
        }
        this.products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
    }

}
const productManager = new ProductManager();


(async()=>{
    console.log(await productManager.getProducts());


const newProduct = {
    title: "Jenga",
    description: "Juego de caja",
    price: 100,
    thumbnail: "jenga.jpg",
    code: 111,
    stock: 25,
};


//await productManager.addProduct(newProduct);
//console.log(await productManager.getProducts());

//await productManager.getProductById(1)
//console.log(await productManager.getProducts);


//const productId = 1;
//const productToUpdate = {
//    price: 250,
//   stock: 5
//};

//await productManager.updateProduct(productId, productToUpdate);
//console.log(await productManager.getProducts());


//await productManager.deleteProduct(productId);
//console.log(await productManager.getProducts());
})();
