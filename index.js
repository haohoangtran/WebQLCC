const mongoose = require('mongoose');
const config = require('./config');
const session = require('express-session')
const apis = require('./apis/index')
const PORT = process.env.PORT || 6969;
let express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', handlebars({}));
app.set('view engine', 'handlebars');
app.use('/apis', apis);
const {getAllUser, register} = require('./database/user')
mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect success');
    }
});

app.use(express.static(__dirname + '/public'));
http.listen(PORT, function () {
    console.log(`Server started. Listening on *:${PORT}`);
});
app.get('/', (req, res) => {
    res.render("login")
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
});