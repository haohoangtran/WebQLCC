const mongoose = require('mongoose');
require('./database/position/positionSchema')
const config = require('./config');
const session = require('express-session');
const multer = require('multer');
const xlsx = require('node-xlsx');
const path = require('path');
const apis = require('./apis');
const PORT = process.env.PORT || 6969;
let express = require('express');
const handlerbars = require('express-handlebars');
const bodyParser = require('body-parser');
const cache = require('cache-control');
let app = express();
app.use(session({
    secret: '%^&@%&#@!',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', handlerbars({
    defaultLayout: 'main',
    helpers: {
        getBGColor: (fullname) => {
            const userName = fullname || '';

            let sumChars = 0;
            for (let i = 0; i < userName.length; i += 1) {
                sumChars += userName.charCodeAt(i);
            }
            let colors = {
                carrot: '#e67e22',
                emerald: '#2ecc71',
                peterRiver: '#3498db',
                wisteria: '#8e44ad',
                alizarin: '#e74c3c',
                turquoise: '#1abc9c',
                midnightBlue: '#2c3e50'
            };
            colors = Object.values(colors);
            return colors[sumChars % colors.length];
        },
        getSortName: (fullname) => {
            const userName = fullname || '';
            userName.trim();
            let name = userName.toUpperCase().split(' ');
            let avatarName = "";
            if (name.length === 1) {
                avatarName = ` ${name[0].charAt(0)}`;
            } else if (name.length > 1) {
                name = name.filter((item) => {
                    return item;
                })
                avatarName = `${name[0].charAt(0)}${name[name.length - 1].charAt(0)}`;
            }
            return avatarName;
        },
        formatMoney: (money) => {
            let result = (+money).toFixed(0).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            });
            return `${result} đ`

        }
    }
}));
app.set('view engine', 'handlebars');
app.set('etag', false);
app.use('/apis', apis);
const {getAllUser, register} = require('./database/user');
const {getAllEmploye, findEmployeById} = require('./database/employe');
const {createCongUser, getAllCongUser} = require('./database/congUser');
const {getCong} = require('./database/congUser');
const {getAllPosition, findPositionByName} = require('./database/position');
mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect success');
    }
});
app.use(function (req, res, next) {
    req.headers['if-none-match'] = '';
    req.headers['if-modified-since'] = '';
    if (!req.session.token && req.url !== '/' && req.url.indexOf(".") === -1 && req.url.indexOf("/apis/") === -1) {
        res.redirect(307, '/')
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, "public"), {
    redirect: false,
    etag: false
}));

app.use(cache({
    '/**': 0 // Default to caching all items for 500
}));
app.listen(process.env.PORT || 6969, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.get('/hi', (req, res) => {
    let arr = [
        "Giám đốc", "P. Giám đốc", "Thư ký", "Kế toán Trưởng", "Kế toán viên", "TP. Kinh doanh", "P. Kinh doanh",
        "NV Kinh doanh", "NV Bán hàng", "NV Văn phòng"
    ];
    let {addNewPosition} = require('./database/position');
    let results = []
    for (let tem of arr) {
        addNewPosition(tem, (err, result) => {
            console.log(err)
            results.push(result);
        });
    }
    setTimeout(() => {
        res.send(results)
    }, 4000)
})
app.get('/nhanvien', (req, res) => {

    console.log(" vao ", req.session.token);
    getAllEmploye((err, employes) => {
        res.render("employe", {employes})
    });

});

app.get('/edit', (req, res) => {
    let id = req.query.id;
    findEmployeById(id, (err, result) => {
        getAllPosition((err, positions) => {
            console.log(result)
            res.render("editemploye", {
                id: result.id,
                name: result.name.trim(),
                salary: result.salary,
                department: result.department.name,
                positions
            })
        })
    })
});
app.post('/edit', (req, res) => {
    let obj = req.body;

    findEmployeById(obj.id, (err, employe) => {
        console.log(err)
        findPositionByName(obj.department, (err, position) => {
            console.log(err)
            employe.department = position._id
            employe.name = obj.name;
            employe.salary = obj.salary;
            employe.save((err => {
                if (err) {
                    res.send(`Co loi ${err}`)
                } else {
                    res.status(307).redirect("/nhanvien")
                }
            }));
        })
    });

});
app.get('/delete', (req, res) => {

    res.send("hi")
});
app.get('/getCong/:month/:year', (req, res) => {
    let month = req.params.month;
    let year = req.params.year;
    getAllCongUser(`${month}/${year}`, (err, result) => {
        console.log(err, result);
        res.send(result);
    });
});

app.get('/apis/getCong', (req, res) => {

    getCong(`2018`, (err, result) => {
        console.log(err, result);
        res.send({result});
    });
});
app.get('/', (req, res) => {
    console.log("token ", req.session.token);
    if (req.session.token) {
        let date = new Date();
        getCong(`${date.getMonth() + 1}/${date.getFullYear()}`, (err, thang) => {
            getCong(`${date.getFullYear()}`, (err, nam) => {
                getAllEmploye((err, allEmploye) => {
                    getAllUser((err, users) => {
                        res.render("dashboard", {
                            coutAdmin: users.length,
                            countEmploye: Object.keys(allEmploye).length,
                            congThang: thang,
                            congNam: nam
                        })
                    })
                })
            })
        });
    } else {
        res.render("login", {layout: false})
    }

});

/** API path that will uploads the files */
const {createEmploye} = require('./database/employe');
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
                        row.pop();//bo cai cuoi cung trong file la tong cong ....
                        for (let i in row) {

                            if (row[i] && row[i].indexOf('x') !== -1) {
                                let obj = {
                                    user: employes[contentUser[0]]._id,
                                    month,
                                    value: String(row[i]).trim(),
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
    res.render("uploads");
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
});
app.get('/logout', (req, res) => {
    req.session.token = null;
    res.status(307).redirect('/');
})
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
};


let first = (p) => {
    for (let i in p) {

        return p[+i];
    }

};