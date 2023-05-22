let un=['pratyut','aikata','hemlata','shashindra','ankur'];
let passw=['1','12','123','1234','12345'];

const express = require('express')
const app = new express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
const bodyparser=require('body-parser');
const cookieParser = require('cookie-parser');

// app.use(express.static( path.join(__dirname, '/public/html') ))
app.use(express.static( path.join(__dirname, '/public/css') ))
app.use(express.static( path.join(__dirname, '/public/js') ))
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine','ejs');

let htmlfolder = path.join(__dirname, "/public/html");

app.get("/", (req, res) => {
  if (req.cookies.email) {
      res.redirect("/dashboard");
  }
  else{
      res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(htmlfolder, "login.html"));
});

app.post("/lg",(req, res) =>{
  const email= req.body.email;
  const pass = req.body.password;
  console.log(email+" -- "+pass);
  for(let i =0;i<un.length;i++){
      if(un[i] === email.trim() && passw[i]==pass.trim()){
          res.cookie('email', email, { expires: 0 })
          return res.status(200).redirect("/dashboard");
      }
  }
  res.redirect("/");
});

app.get("/dashboard", (req, res) => {
  if (req.cookies.email) {
    let i=0;
  for(;i<un.length;i++){
    if(un[i] === (req.cookies.email).trim()){
      res.sendFile(path.join(htmlfolder, "index.html"));
    }
  }
  }else {
    res.redirect('/');
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie('email');
  res.redirect('/');
});

app.get("*", (req, res) => {
  res.send("Wrong place kiddo");
});

const port = process.env.PORT || 80

server.listen(port, ()=> {
  console.log('listening on: ', port)
})

io.on('connection', socket => {
  console.log('Some client connected')
  socket.on('chat', message => {
    io.emit('chat', {message, id: socket.id})
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})