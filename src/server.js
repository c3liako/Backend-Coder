import express from 'express';
import productsRouter from './routes/products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/products', productsRouter);


const PORT = 8080

app.listen(PORT,()=>{
    console.log(`server OK on port: ${PORT} `)
})