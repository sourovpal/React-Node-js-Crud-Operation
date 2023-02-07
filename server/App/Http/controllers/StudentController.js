const { StudentsModel } = require("../../models/StudentsModel");
const Validator = require('validatorjs');

const index = async(req, res)=>{
    const data = await StudentsModel.find({}).sort({ 'roll' : 'desc'});
    res.json(data);
}

const store = async(req, res)=>{
    try{
        req.body.avatar = null;
        if(req.file){
            req.body.avatar = req.file.filename;
        }
        let rules = {
            name: 'required',
            roll:'required',
            reg:'required',
            class:'required',
            age:'required|min:2',
            avatar:'required',
            class:'required',
            email: 'required|email',
            phone: 'required',
            password: 'required|string|min:6|confirmed',
            password_confirmation: 'required|string|min:6',
        };
        let inEmail = null;
        if(req.body.email){
            inEmail =  await StudentsModel.findOne({email:req.body.email});
        }

        let validation = await new Validator(req.body, rules);
        inEmail?validation.errors.add('email', 'This email is already taken.'):null;
        validation.setAttributeNames({ reg: 'Registration' });

        if(validation.passes() && !inEmail){
            await StudentsModel.create(req.body);
            res.status(200).json({
                status:true,
                message:'New user created successful.',
                data:[],           
                errors:[],
            });
        }else{
            res.status(200).json({
                status:false,
                message:'Form Validation Errors.',
                data:[],           
                errors:validation.errors.all(),
            });
        }
    }catch(error){
        res.status(500).json({
            status:false,
            message:'Something went wrong please try again.',
            data:[],
            errors:error,
        });
    }
}

const show = async(req, res)=>{
    try{
        const data = await StudentsModel.findOne({_id:req.params.id});
        if(data){
            res.status(200).json({
                status:true,
                message:'A user has been found.',
                data:data,
                errors:[],
            });
        }else{
            res.status(404).json({
                status:false,
                message:`Student not found!.`,
                data:[],           
                errors:[],
            });
        }
    }catch(error){
        if(error){
            res.status(500).json({
                status:false,
                message:'Something went wrong please try again.',
                data:[],           
                errors:error.message,
            });
        }
    }
}

const update = async(req, res)=>{
    try{
        if(req.file){
            req.body.avatar = req.file.filename;
        }
        let rules = {
            name: 'required',
            roll:'required',
            reg:'required',
            class:'required',
            age:'required|min:2',
            class:'required',
            email: 'required|email',
            phone: 'required',
            password: 'required|string|min:6|confirmed',
        };
        let inEmail = null;
        if(req.body.email){
            inEmail =  await StudentsModel.findOne({$and:[
                {_id:{$ne: req.params.id}},
                {email:req.body.email},
            ]});
        }
        let validation = await new Validator(req.body, rules);
        inEmail?validation.errors.add('email', 'This email is already taken.'):null;
        
        validation.setAttributeNames({ reg: 'Registration' });
        if(validation.passes() && !inEmail){
            const data = await StudentsModel.findOneAndUpdate({_id:req.params.id}, req.body);
            if(data){
                    res.status(200).json({
                        status:true,
                        message:'Student data updated successful.',
                        data,           
                        errors:[],
                    });
            }else{
                res.status(404).json({
                    status:false,
                    message:`Student not found!.`,
                    data:[],           
                    errors:[],
                });
            }
        }else{
            res.status(200).json({
                status:false,
                message:'Form Validation Errors.',
                data:[],           
                errors:validation.errors.all(),
            });
        }
    }catch(error){
        if(error){
            console.log(error);
            res.status(500).json({
                status:false,
                message:'Something went wrong please try again.',
                data:[],           
                errors:error,
            });
        }
    }
}

const destroy = async(req, res)=>{

    try{
        const data = await StudentsModel.findOne({_id:req.params.id});
        if(data){
            data.remove();
            res.status(200).json({
                status:true,
                message:'Student data deleted successful.',
                data:[],           
                errors:[],
            });
        }else{
            res.status(404).json({
                status:false,
                message:`Student not found!.`,
                data:[],           
                errors:[],
            });
        }
    }catch(error){
        if(error){
            res.status(500).json({
                status:false,
                message:'Something went wrong please try again.',
                data:[],           
                errors:error.message,
            });
        }
    }
    
}



module.exports = {
    index,
    store,
    show,
    update,
    destroy
}


