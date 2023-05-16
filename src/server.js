import express from 'express';
import morgan from 'morgan';
import {errorHandler} from './middlewares/errorHandler.js';
import {__dirname} from './path.js';


import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(errorHandler);

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);


const PORT = 8080

app.listen(PORT,()=>{
    console.log(`server OK on port: ${PORT} `)
})