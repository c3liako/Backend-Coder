
const { Console } = require('console');
const fs = require('fs');





class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
    }

/* --------------------------- AÑADIR UN PRODUCTO --------------------------- */

    async addProduct(product){

        const products = await this.getProducts();
        const existingCode = products.find((prod)=> prod.code===product.code)
        if(existingCode){
            return console.log('Elcodigo ya existe')
        } if(!product.code || !product.title || !product.description || !product.price ||!product.stock || !product.thumbnail){
            return console.log ('Falata rellenar campos')
        } 
        product.id = await this.#getNewId();
        
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8")
        
        return console.log('Se añadio el producto')
    }

/* --------------------------- ID AUTO INCREMENTAL -------------------------- */

    async #getNewId(){
        const products = await this.getProducts();
        let max = 0;
        if (products.length > 0){
            products.forEach(product => {if(product.id > max) max = product.id }   );
        }
        return max + 1;
    }

/* --------------------------- LISTA DE PRODUCTOS --------------------------- */

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS;
            }else {
                return [] ;
            }
        }catch (error){
            console.log(error)
        }
    }

/* ----------------------- BUSQUEDA DE PRODUCTO POR ID ---------------------- */

    async getProductById(id){
        const productsFile = await this.getProducts();
        const product = productsFile.find ((product) => product.id === id);
        if(!product){
            console.log(`Id : ${id} . Not Found`);
        }
        return product;
    }

/* --------------------------- ACTUALIZAR PRODUCTO -------------------------- */

    async updateProduct(id, updates){
        const productsFile = await this.getProducts();
        const productIndex = productsFile.findIndex((product) => product.id === id);
        if (productIndex === -1){
            console.log(`Id : ${id} . Not Found`);
        }
        const updatedProduct = Object.assign ({}, productsFile[productIndex], updates);
        productsFile[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile), 'utf-8');
    }

/* -------------------------- ELIMINAR UN PRODUCTO -------------------------- */

    async deleteProduct(id){
        const productsFile = await this.getProducts();
        const productIndex = productsFile.findIndex((product) => product.id ===id);
        if(productIndex===-1){
            console.log(`Id : ${id} . Not Found`);
        }
        productsFile.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile), 'utf-8');
    }

}


/* ---------------------------------- TESTS --------------------------------- */

const productManager = new ProductManager('./products.json');


(async()=>{
    //console.log(await productManager.getProducts());


    const newProduct = {
        title: "Jenga",
        description: "Juego de caja",
        price: 100,
        thumbnail: "jenga.jpg",
        code: 222,
        stock: 25,
    };


//await productManager.addProduct(newProduct);
//console.log(await productManager.getProducts());

//await productManager.getProductById(1)
//console.log(await productManager.getProducts());


 const productId = 2;
// const productToUpdate = {
//     price: 250,
//     stock: 5
// };

// await productManager.updateProduct(productId, productToUpdate);
// console.log(await productManager.getProducts());


await productManager.deleteProduct(productId);
console.log(await productManager.getProducts());
})();
