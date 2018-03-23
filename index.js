const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const xlsx = require('node-xlsx');
const apis = require('./apis/index');
const PORT = process.env.PORT || 6969;
let express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
app.use(session({
    secret: '%^&@%&#@!',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use('/apis', apis);
const {getAllUser, register} = require('./database/user')
const {getAllEmploye} = require('./database/employe')
const {createCongUser, getAllCongUser} = require('./database/congUser')
mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect success');
    }
});
app.use(function (req, res, next) {
    if (req.session.token == null && req.url !== '/' && req.url.indexOf(".") === -1) {
        res.redirect(301, '/')
    } else {
        next();
    }
});
app.use(express.static(__dirname + '/public', {redirect: false}));
http.listen(PORT, function () {
    console.log(`Server started. Listening on *:${PORT}`);
});

app.get('/getCong/:month/:year', (req, res) => {
    let month = req.params.month;
    let year = req.params.year;
    getAllCongUser(`${month}/${year}`, (err, result) => {
        console.log(err, result);
        res.send(result);
    });
});
app.get('/', (req, res) => {
    console.log("token ", req.session.token);
    if (req.session.token) {
        res.render("home", {layout: false})
    } else {
        res.render("login", {layout: false})
    }

});

/** API path that will uploads the files */
const {createEmploye} = require('./database/employe')
app.post('/uploads', function (req, res) {
    getAllEmploye((err, employes) => {
        console.log(err, employes);
        upload(req, res, function (err, filename) {
            if (err) {
                res.json({
                    filename: filename,
                    error_code: 1,
                    err_desc: err
                });
                return;
            }
            try {
                let obj = xlsx.parse(`${__dirname}/uploads/${req.file.filename}`);
                let sheet = obj[0].data;
                let arrCanUser = [];//lay nhung field quan trong
                for (let row of sheet) {
                    let firstRow = first(row);
                    if (row && row[0]) {

                        if (String(firstRow).indexOf("BẢNG CHẤM CÔNG THÁNG") !== -1) {
                            arrCanUser.push([...row]);
                        }
                        else if (isInterger(firstRow)) {
                            arrCanUser.push([...row])
                        }
                    }
                }
                console.log(arrCanUser);
                let month;
                for (let row of arrCanUser) {
                    if (row.length === 1) {
                        let arr = first(row).trim().split(' ');
                        month = arr[arr.length - 1];
                    } else {

                        let contentUser = row.splice(0, 3);
                        row.pop();//bo cai cuoi cung
                        for (let i in row) {

                            if (row[i] && row[i].indexOf('x') !== -1) {
                                let obj = {
                                    user: employes[contentUser[0]]._id,
                                    month,
                                    value: row[i],
                                    day: +i + 1,//start at 0  nen  +1
                                };
                                console.log(obj)
                                createCongUser(obj, (err, result) => {

                                });
                            }
                        }
                    }
                }

            } catch (ex) {
                console.log(ex)
            }

            res.json({
                filename,
                error_code: 0, err_desc: null
            });
        });
    });
});
app.get('/uploads', function (req, res) {
    res.sendFile(__dirname + "/uploadexel.html");
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
});

let storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();

        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

let upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

let isInterger = (number) => {
    return +number === number;
}


let first = (p) => {
    for (let i in p) {

        return p[+i];
    }

}