const authRouter = require("express").Router()
const authController = require("../controllers/auth")
const {logout} = require ("../repo/auth")
const authRepo = require ("../repo/auth")
const {checkWhitelistToken} = require ('../repo/users')
//login
authRouter.post("/login", authController.authCon)
authRouter.delete("/logout", authRepo.logout)

// register
authRouter.post("/", (req, res) => {

})

// edit password
authRouter.patch("/account", (req, res) => {

})


// edit profile
authRouter.patch("/", (req, res) => {
    
})

//logout
// authRouter.delete("/", (req, res) => {

// })

module.exports = authRouter