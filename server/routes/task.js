import {Router} from 'express'
import taskModel from "../models/taskModel.js";

const router= new Router();

router.post('/',async (req,res)=>{
   try{
       const task = await taskModel.create({
           text: req.body.text,
           status: req.body.status,
       })
       res.status(200).json({task});
   }catch(error){
       res.status(500).json({message:"Something went wrong"});
       console.log(error);
   }
})

router.get('/',async (req,res)=>{
    try{
       const tasks=await taskModel.find();
       res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
        console.log(error);
    }
})

router.patch('/:id',async (req,res)=>{
    try{
       const id = req.params.id;
       const task=await taskModel.findOneAndUpdate({_id:id},{status: req.body.status});
       res.status(200).json({
           message:"success",
           task: {task}
       });
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
        console.log(error);
    }
})
export default router;