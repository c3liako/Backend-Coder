class ProductManager{
    constructor(){
        this.products = [];
    }
    
    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            id: this.#nuevoId() + 1,
            stock
        };
        this.products.push(product)
    }

    #nuevoId(){
        let maxId = 0;
        this.products.map ((product)=> {
            if (product.id > maxId) maxId = product.id;
        })
        return maxId
    }id

    getProductById(idProduct){
        return this.products.find((product)=> product.id === idProduct)
    }

}

const productManager = new ProductManager()

productManager.addProduct("Jenga", "Juego de caja", 1000, "thumbnail", 3)
productManager.addProduct("Mochila", "Mochila", 500, "thumbnail", 10)
console.log(productManager.getProducts())
console.log(productManager.getProductById(2))



