const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user")

const isLoggedIn =  async (req, res, next)=>{
    const token = req.cookies.accessToken
    

    if(!token){
        return res.status(403).json({
            status: "error",
            message: "Please provide token"
        })
    }
    // verify if the token is valid and has not expired
    const decoded = jwt.verify(token, process.env.jwt_secret)
    // find the user that the token was generated for
    const user = await UserModel.findById(decoded.id)

    if(!user){
        return res.status(404).json({
            status: "error",
            message: "This token belongs to no one"
        })
    }

    req.user = user
    // console.log(user);
    // console.log(decoded);
    // console.log(req.user);
    // console.log(user.id); 
    
    next()
}

module.exports = isLoggedIn