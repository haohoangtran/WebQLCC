const mongoose = require('mongoose');
const config=require('./config')
let express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
const {getAllUser,register} =require('./database/user')
mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect success');
    }
});
app.use(express.static(__dirname + '/public'));
http.listen(6969, function(){
    console.log('Server started. Listening on *:6969');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/login.html')
});
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html')
});