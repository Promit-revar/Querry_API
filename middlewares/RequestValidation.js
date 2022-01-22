const validator = require('validator');
exports.authValidation=(data,res)=>{
    const validationErrors = [];
	if (!validator.isEmail(data.email)) validationErrors.push('Please enter a valid email address.');
	if (validator.isEmpty(data.password)) validationErrors.push('Password cannot be blank.');
	if (validationErrors.length) {
		
		res.status(200).json({
			status: "Fail",
            Message:validationErrors
		});
        return false;
	}
    return true;
}
exports.createValidation=(data,res)=>{
    const validationErrors = [];
	if (!validator.isMobilePhone(data.mob)) validationErrors.push('Please enter a valid Mobile Number.');
	if (validator.isEmpty(data.name)) validationErrors.push('Name cannot be blank.');
    if(!(validator.equals(data.gender,"Male")|| validator.equals(data.gender,"Female"))){
        validationErrors.push('Please provide a valid gender value "Male" or "Female".');
    }
	if (validationErrors.length) {
		
		res.status(200).json({
			status: "Fail",
            Message:validationErrors
		});
        return false;
	}
    return true;
}
exports.updateValidation=(data,res)=>{
    const validationErrors = [];
	if (!validator.isEmpty(data.mob) && !validator.isMobilePhone(data.mob)) validationErrors.push('Please enter a valid Mobile Number.');
	if(validator.isEmpty(data.replace)) validationErrors.push('Replace parameter cannot be empty.');
    
    if(!validator.isEmpty(data.gender) && !(validator.equals(data.gender,"Male")|| validator.equals(data.gender,"Female"))){
        validationErrors.push('Please provide a valid gender value "Male" or "Female".');
    }
	if (validationErrors.length) {
		
		res.status(200).json({
			status: "Fail",
            Message:validationErrors
		});
        return false;
	}
    return true;
}
exports.searchValidation=(data,res)=>{
    const validationErrors = [];
	if (!validator.isEmpty(data.mob) && !validator.isMobilePhone(data.mob)) validationErrors.push('Please enter a valid Mobile Number.');
	if(!validator.isEmpty(data.gender) && !(validator.equals(data.gender,"Male")|| validator.equals(data.gender,"Female"))){
        validationErrors.push('Please provide a valid gender value "Male" or "Female".');
    }
	if (validationErrors.length) {
		
		res.status(200).json({
			status: "Fail",
            Message:validationErrors
		});
        return false;
	}
    return true;
}