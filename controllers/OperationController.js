const validate=require('../middlewares/RequestValidation');
const User = require('../models/User');
exports.Create= async (req,res)=>{
     var c=validate.createValidation(req.body,res);
     if(c){
        const results=await User.find({
            name:req.body.name,
            gender:req.body.gender,
            mob:req.body.mob
        });
			if(results.length==0){
            const user = new User({
                name: req.body.name,
                gender: req.body.gender,
                mob: req.body.mob,
            });
            const result = await user.save();
            console.log(result);
            return res.status(200).json({
                status: "SUCCESS",
                msg: "Record created successfully"
            });
        }
        else{
            const user = new User({
                name: req.body.name,
                gender: req.body.gender,
                mob: req.body.mob,
            });
            const result = await user.save();
            console.log(result);
            return res.status(200).json({
                status: "SUCCESS",
                msg: "Duplicate record exists"
            });
        }     
		} else {
			
			res.status(200).json({
				status: "Fail"
			});
		}
	
     }
exports.Update=(req,res)=>{
    var c=validate.updateValidation(req.body,res);
    if(c){
        if(req.body.replace=='all'){
            User.updateMany({$or:[
                {name:req.body.name},
                {mob:req.body.mob},
                {gender:req.body.gender}
            ]},{$set:req.body.to},(err,docs)=>{
               if(err) {
                res.status(500).send({
                    status:'Fail',
                    error:err
                });
               }
               else{
                   res.status(200).send({
                       status:'Success',
                       message:docs
                    
                   });
               }
            });
        }
        else{
            User.updateOne({$and:[
                {name:req.body.name},
                {mob:req.body.mob},
                {gender:req.body.gender}
            ]},{$set:req.body.to},(err,docs)=>{
               if(err) {
                res.status(500).send({
                    status:'Fail',
                    error:err
                });
               }
               else{
                   res.status(200).send({
                       status:'Success',
                       message:docs
                    
                   });
               }
            });
        }
    }
    
}
exports.Delete=async(req,res)=>{
    var c=validate.createValidation(req.body,res);             //since the parameters to validate are the same for both...
    if(c){
        const result=await User.findOneAndDelete({
            name:req.body.name,
            mob:req.body.mob,
            gender:req.body.gender
        });
        //console.log(result);
        if(result){
        res.status(200).send({
            status:"Success",
            message:"Successfull deleted the record"
        })
    }
    else{
        res.status(404).send({
            status:"Fail",
            message:"No such records found!"
        });
    }
    }
}
exports.Read=async (req,res)=>{
    var c=validate.searchValidation(req.body,res);
    if(c){
        User.find({$or:[
            {name:req.body.name},
            {gender:req.body.gender},
            {mob:req.body.mob}
        ]},(err,docs)=>{
            if(err) {
                res.status(500).send({
                    status:'Fail',
                    error:err
                });
               }
               else if(docs.length==0){
                res.status(404).send({
                    status:"Fail",
                    message:"No such records found!"
                });
            }
            else{
                   res.status(200).send({
                       status:'Success',
                       message:docs
                    
                   });
            }
        });
        
        
    }
}
