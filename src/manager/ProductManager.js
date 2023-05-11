const fs = require('fs');





export default class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
    }

/* --------------------------- AÑADIR UN PRODUCTO --------------------------- */

    async addProduct(product){
        try {
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
        } catch (error) {
            console.log(error)
        }
        
    }

/* --------------------------- ID AUTO INCREMENTAL -------------------------- */

    async #getNewId(){
        const products = await this.getProducts();
        let maxId = 0;
        if (products.length > 0){
            products.forEach(product => {if(product.id > maxId) maxId = product.id }   );
        }
        return maxId + 1;
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

        try {
            const productsFile = await this.getProducts();
            const product = productsFile.find ((product) => product.id === id);
            if(!product){
            console.log(`Id : ${id} . Not Found`);
            }
            return product;
        } catch (error) {
            console.log(error)
        }
        
    }

/* --------------------------- ACTUALIZAR PRODUCTO -------------------------- */

    async updateProduct(id, updates){

        try {
            const productsFile = await this.getProducts();
            const productIndex = productsFile.findIndex((product) => product.id === id);
            if (productIndex === -1){
                console.log(`Id : ${id} . Not Found`);
            }
            const updatedProduct = Object.assign ({}, productsFile[productIndex], updates);
            productsFile[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile), 'utf-8');
        } catch (error) {
            console.log(error)
        }

        
    }

/* -------------------------- ELIMINAR UN PRODUCTO -------------------------- */

    async deleteProduct(id){

        try {
            const productsFile = await this.getProducts();
            const productIndex = productsFile.findIndex((product) => product.id ===id);
            if(productIndex===-1){
                console.log(`Id : ${id} . Not Found`);
            }
            productsFile.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile), 'utf-8');    
        } catch (error) {
            console.log(error)
        }
    
    }



/* ---------------------- ELIMINAR TODOS LOS PRODUCTOS ---------------------- */
    async deleteAllProdcuts(){
        try {
            if(fs.existsSync(this.path)){
                await fs.promises.unlink(this.path)
            }
        } catch (error) {
            console.log(error)
        }
    }
}