const  jwt = require("jsonwebtoken")

const userAuth = (req, res, next) => {

    const authHeader = req.headers['authorization']
 console.log(req.headers['authorization'])
    if(!authHeader) return res.status(401).json({message: 'Authorization token required'})
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: "Invalid Token"})

        console.log(decoded)
        next();
    })

}

module.exports = userAuth