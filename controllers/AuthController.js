const bcrypt = require('bcryptjs');
const validate=require('../middlewares/RequestValidation');

const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');




exports.login = (req, res, next) => {
	
	Admin.findOne({
			
				email: req.body.email
			
		}).then(admin => {
			if (admin) {
				bcrypt
					.compare(req.body.password, admin.password)
					.then(doMatch => {
						if (doMatch) {
							
							
								const secretKey = process.env.SECRET_JWT;
								const mytoken = jwt.sign({
									email: admin.email
								}, secretKey, {
									expiresIn: '1h'
								});
								
								res.status(200).json({
									status: "Success",
									token: mytoken
								});
							}
						
						res.status(401).send({status: "Fail", message:'Invalid email or password.'});
						
						
					})
					.catch(err => {
						console.log(err);
						
						
						res.status(200).json({
							status: "Fail",
                            error: 'Sorry! Something went wrong.'
						});
					});
			} else {
				res.status(404).json({
					status: "Fail",
                    message:"No user Found"
				});
			}
		})
		.catch(err => console.log(err));
};



exports.home=(req,res,next)=>{
    res.render('welcome');
}

exports.register = (req, res, next) => {
    var c=validate.authValidation(req.body,res);
    if(c){
	Admin.findOne({
		
			email: req.body.email
		
	}).then( async admin => {
		if (!admin) {
			console.log(req.body.email);
			const hashedPassword = await bcrypt
                .hash(req.body.password, 12);
            const admin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            const result = await admin.save();
            console.log(result);
            return res.status(200).json({
                status: "SUCCESS",
                msg: "Admin created successfully"
            });
                
		} else {
			
			res.status(200).json({
				status: "Fail",
                message:`User already exists with mailid ${req.body.email}`
			});
		}
	})
  }
  
}