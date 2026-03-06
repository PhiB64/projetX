export const validate=(schema) => (req, res, next) => 
    {const result = schema.validate(req.body);
        if(!result.succes) {
            return res.status(400).json({ errors: result.error.flatten(),fieldErrors,});
        }
       req.body = result.data;
       next();
    }