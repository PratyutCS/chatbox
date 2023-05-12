let un=['pratyut','aikata','hemlata','shashindra'];
let passw=['1','12','123','1234'];

let Express = require('express')
let path = require('path');
let http = require('http');
let bodyparser=require('body-parser');
const cookieParser = require('cookie-parser');

const app = new Express();

app.use(Express.static(__dirname + '/public/js'));
app.use(Express.static(__dirname + '/public/css'));

app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

let htmlfolder = path.join(__dirname, "/public/html");

app.set('view engine','ejs');

app.get("/", (req, res) => {
    if (req.cookies.email) {
        res.redirect("/dashboard");
    }
    else{
        res.sendFile(path.join(htmlfolder, "index.html"));
    }
});

app.post("/lg",(req, res) =>{
    const email= req.body.email;
    const pass = req.body.password;
    console.log(email+" -- "+pass);
    for(let i =0;i<un.length;i++){
        if(un[i] === email.trim() && passw[i]==pass.trim()){
            console.log(true);
            res.cookie('email', email, { expires: 0 })
            return res.status(200).redirect("/dashboard");
        }
    }
    res.redirect("/");
});


app.get("/dashboard", (req, res) => {
    if (req.cookies.email) {
        const email = req.cookies.email;
        console.log(email);
        res.sendFile(path.join(htmlfolder, "new.html"),{ email:email });
    } else {
        res.redirect('/');
    }
});

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie('email');
    res.redirect('/');
});


app.get("*", (req, res) => {
    res.send("Wrong place kiddo");
});

const PORT = process.env.PORT || 80;

http.createServer(app).listen(PORT, () => {
    console.log("Server is running at :" + PORT);
});