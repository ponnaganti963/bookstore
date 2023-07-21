

const UserModel = require('../models/user')

const checkRole = (roles) => async (req, res, next) => {
    let { email } = req.body

    const user = await UserModel.findOne({ email: email})

    !roles.includes(user.role) ? res.status(401).json("Sorry you don't have access") : next()
}

module.exports = checkRole