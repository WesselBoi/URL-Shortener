const {v4: uuidv4} = require("uuid");
const {setUser} = require("../service/auth");

const User = require('../models/user');

async function handleUserSignup (req,res) {
    const {name , email , password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

async function handleUserLogin (req,res) {
    const {email , password} = req.body;
    const user = await User.findOne({email , password})
    if(!user){
        return res.render("login" , {
            error : "Invalid credentials"
        })
    }

    const sessionId = uuidv4();     // Generate a new session ID

    setUser(sessionId , user)       // Store user in session
    res.cookie("uid" , sessionId)

    return res.redirect("/")
}
 
module.exports = {handleUserSignup , handleUserLogin}