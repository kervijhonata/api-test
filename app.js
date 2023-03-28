const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const hbs = require("express-hbs")
const GenericUserAuth = require("./modules/GenericUser")

// config
    const app = express()

    // Views: HBS
    app.engine("hbs", hbs.express4({
        layoutsDir: path.join(__dirname, "./views/layouts/"),
        defaultLayout: path.join(__dirname, "./views/layouts/main"),
        partialsDir: path.join(__dirname, "./views/partials")
    }))
    app.set("view engine", "hbs")
    app.set("views", path.join(__dirname, "./views/"))

    // DotEnv
    dotenv.config()

    // Generic userAuth
    const user = new GenericUserAuth()


// Middlewares


// Routes
app.get("/", (req, res, next) => {
    res.render("index", {
        documentTitle: "Home"
    })
})

app.get("/login", (req, res, next) => {
    res.render("login")
})

app.get("/signin", (req, res, next) => {
    res.render("signin")
})

app.post("/login/auth", (req, res, next) => {
    console.log("Authenticating user...")
    user.auth = true
    console.log("User authenticated!")
    res.redirect("/admin")
})

app.get("/admin", (req, res, next) => {

    if(user.isAuth){
        console.log("User authenticated")
        res.render("admin/index")
    }
    else{
        console.log("User is not authenticated")
        res.redirect("/")
        res.send("[denied_access] you have no permission to access here")
    }

})


// External routes
const api = require("./routes/api/api.js")
app.use("/api", api)


// Listen
app.listen(process.env.SERVER_PORT, function() {
    console.log("server running on port " + process.env.SERVER_PORT)
})