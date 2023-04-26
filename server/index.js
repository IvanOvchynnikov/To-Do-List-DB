import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import task_router from './routes/task.js';

const app = express();
app.use(express.json())
app.use(cors());


const port = 5555;

const DB="mongodb+srv://ovchinic76:Pass123@cluster0.ee1mej2.mongodb.net/Tasks?retryWrites=true&w=majority";

app.use('/tasks',task_router);

const start = async()=>{
    try{
        await mongoose.connect(DB).then(()=>console.log("DB connected"));
        app.listen(port,()=>{
            console.log("Server started!");
        })
    }catch(error){
        console.log(error);
    }
}

await start();
