const fs = require('fs');


class ProductManager{
    constructor(){
        this.path='./products.json'
    }

    async addProduct(product){

        try{
            const productsFile = await this.getProducts();
            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        }catch (error) {
            console.log(error)
        }
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

    

}
const manager = new ProductManager

const product1 = {
    title: 'Jenga',
    description: 'Juego de caja',
    price: 100,
    thumbnail: 'foto.jpg',
    code: 111,
    stock: 10
}

const test = async()=>{
    const get = await manager.getProducts();
    console.log(get)
    await manager.addProduct(product1);
    const get2 = await manager.getProducts();
    console.log(get2)
}

test()