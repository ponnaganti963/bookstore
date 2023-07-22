
const Joi = require('joi')
const Validators = {
    signUpSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        name: Joi.string().min(1).required(),
        role:  Joi.string().allow('customer','admin').required()
    }),
    loginSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        role:  Joi.string().allow('customer','admin').required()
    }),
    bookSchema: Joi.object({
        email: Joi.string().email().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        genre: Joi.string().required()
    })
    
}
module.exports = (validator) => {
    if(!Validators.hasOwnProperty(validator))
        res.status(400).json({message: 'Validator is not exist'})

    return async ( req, res, next ) => {
        try{
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        }catch(err){
            if(err.isJoi)
                return res.status(422).json({messgae: err.message})
            res.status(500).json({messgae: "error"}) 
        }
    }
}