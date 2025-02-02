import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import faqRoutes from './routes/faqRoutes.js'
import admin from './routes/admin.js'
import {connectToMongo} from './database/db.js';

dotenv.config();

connectToMongo();


const app = express()
app.use(cors());
app.use(express.json());
const port=process.env.PORT || 8000;
app.use('/api/faqs',faqRoutes);
app.use('/api/admin',admin);
app.get('/api/', (req, res) => {
  res.send('hello sid')
})

app.listen(port,()=>{
    console.log(`server listining on port${port}`)
});