import express from 'express';
import cors from 'cors';
import helmet from 'helmet';  
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user-route.js';
import categoryRouter from './routes/category-route.js';
import uploadRouter from './routes/upload-router.js';
import subCategoryRouter from './routes/subCategory-route.js';
import productRoute from './routes/product-route.js';
import cartRouter from './routes/cart-route.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';
const app = express();
dotenv.config();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));


app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser()); 
app.use(helmet({
    crossOriginResourcePolicy: false
}));


app.get('/', (req, res) => {
    res.json({
        message: 'server is running'
    })
});


app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 8000;

connectDB().then(() => 
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    })
)
