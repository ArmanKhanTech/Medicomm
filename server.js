const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

//firebase admin setup
let serviceAccount = require("./medical-ecomm-website-firebase-adminsdk-qn6i0-7b89ea4ed1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let staticPath = path.join(__dirname, "");

let db = admin.firestore();

//intializing express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})

//routes
//home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    // form validations
    if(name.length < 3){
        return res.json({'alert': 'Name Must be 3 Letters Long'});
    } else if(!email.length){
        return res.json({'alert': 'Enter Your E - Mail'});
    } else if(password.length < 8){
        return res.json({'alert': 'Password Should be 8 Letters Long'});
    } else if(!number.length){
        return res.json({'alert': 'Enter Your Phone Number'});
    } else if(!Number(number) || number.length < 10){
        return res.json({'alert': 'Invalid Number'});
    } else if(!tac){
        return res.json({'alert': 'You Must Agree All Terms and Conditions'});
    }   

    db.collection('users').doc(email).get().then(user => {
    if(user.exists){
        return res.json({'alert': 'E- Mail Already Exists'});
    } else{
        // encrypt the password before storing it.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                req.body.password = hash;
                db.collection('users').doc(email).set(req.body)
                .then(data => {
                    res.json({
                        name: req.body.name,
                        email: req.body.email,
                        seller: req.body.seller,
                    })
                })
            })
        })
    }
})
})

// login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    
    // form validations
    if(!email.length || !password.length){
        return res.json({'alert': 'Fill All the Inputs'});
    }

    db.collection('users').doc(email).get().then(user => {
        if(!user.exists){
            return res.json({'alert': 'E - Mail Does Not Exists'});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) =>{
                if(result){
                    let data=user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                } else{
                    return res.json({'alert' : 'Incorrect Password'})
                }
            })
        }
    })
})

//seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let { name, about, address, number, tac, email } = req.body;
    if(!name.length || !about.length || !address.length || !number.length == 10||
        !Number(number)){
        return res.json({'alert':'Some Information(s) is/are Invalid'});
    } else if(!tac){
        return res.json({'alert':'You Must Agree All Terms and Conditions'});
    } else {
        db.collection('sellers').doc(email).set(req.body).then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                res.json(true);
            })
            
        })
    }
})

app.post('/add-product', (req, res) => {
    let { name, shortDes, des, actualPrice, discount, sellPrice, stock, use, cate, tac, id} = req.body;

    if(!name.length){
        return res.json({'alert': 'Enter Product Name'});
    } else if(shortDes.length > 100 || shortDes.length < 10){
        return res.json({'alert': 'Short Description Must be Between 10 to 100 Letters Long'});
    } else if(!des.length){
        return res.json({'alert': 'Enter Detailed Description About the Product'});
    } else if(!actualPrice.length || !discount.length || !sellPrice.length){
        return res.json({'alert': 'You Must Add Pricings'});
    } else if(stock < 20){
        return res.json({'alert': 'You Should Have at Least 20 Items in Stock'});
    } else if(!use.length){ 
        return res.json({'alert': 'Enter Use of the Products'});
    } else if(!cate.length){
        return res.json({'alert': 'Enter Category of the Product'});
    } else if(!tac){
        return res.json({'alert': 'You Must Agree Our Terms and Conditions'});
    }

    let docName = '';
    var tmp = "addproduct.html";

    if(id == null || id == tmp || id == undefined){
        docName = `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
    } else{
        docName = id;
    }
    
    db.collection('products').doc(docName).set(req.body)
    .then(data => {
        res.json({'product': name});
    })
    .catch(err => {
        return res.json({'alert': 'Some Error Occurred. Try Again'});
    })
})

app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "addproduct.html"));
})

//get products
app.post('/get-products', (req, res) => {
    const {email, id, cate} = req.body;

    if(id){
        docref = db.collection('products').doc(id);
    } else if(cate){
        docref = db.collection('products').where('cate', '==' ,cate);
    } else if(email){
        docref = db.collection('products').where('email', '==' ,email);
    }
    docref.get().then(products => {
        if(products.empty){
            return res.json('no-products');
        }

        let prArr = [];
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(items => {
                let data = items.data();
                data.id = items.id;
                prArr.push(data);
            })
            res.json(prArr);
        }
    })
})

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.post('/get-product', (req, res) => {
    const {id} = req.body;

    let docref = db.collection('products').doc(id);
    
    docref.get().then(product => {
        if(product.empty){
            return res.json('not-available');
        } else{
            res.json(product.data());
        }
    })
})

app.post('/get-seller', (req, res) => {
    const { email } = req.body;

    let docref = db.collection('sellers').doc(email);

    docref.get().then(products => {
        return res.json(products.data());
    })
})

app.post('/get-all-products', (req, res) => {
    let {tac} = req.body;  

    let docref = db.collection('products').where('tac', '==' ,tac);

    docref.get().then(products => {
        if(products.empty){
            return res.json('no-products');
        }

        let prArr = [];
        
        products.forEach(items => {
            let data = items.data();
            data.id = items.id;
            prArr.push(data);
        })
        res.json(prArr);
        
    })
})

app.post('/get-search-result', (req, res) => {
    let {key} = req.body;
    let prArr = [];

    let docref = db.collection('products').where('cate', '==' ,key);
    let docref2 = db.collection('products').where('use', '==' ,key);
    let docref3 = db.collection('products').where('name', '==' ,key);

    docref.get().then(products => {
        
        products.forEach(items => {
            let data = items.data();
            data.id = items.id;
            if(data.length != 0){
                prArr.push(data);
            }
        });
    }).then(() => {
        docref2.get().then(products => {
        
            products.forEach(items => {
                let data = items.data();
                data.id = items.id;
                console.log(data);
                if(data.length != 0){
                    prArr.push(data);
                    console.log(data);
                }
            });
        })
    }).then(() => {
        docref3.get().then(products => {
        
            products.forEach(items => {
                let data = items.data();
                data.id = items.id;
                if(data.length != 0){
                    prArr.push(data);
                }
            });
        }).then(() => {
            if(prArr.length != 0){
                res.json(prArr);
            } else{
                res.json('no-products');
            }
        })
    })
})

//delete product
app.post('/delete-product', (req, res) => {
    const {id} = req.body;

    db.collection('products').doc(id).delete()
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

// product page
app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

// cart page
app.get('cart', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})

//search route
app.get('/search', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

// checkout route
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(staticPath, "checkout.html"));
})

// continue tommorow
app.post('/order', (req, res) => {
    const { email, order, address} = req.body;
    let docName = email + parseInt(100000000);
    
    let temp = '';
        for(let i = 0; i < order.length; i++){
            if(temp != order[i].name){
                order.pop(order[i]);
                temp = order[i].name;
            } 
        }

    db.collection('orders').doc(docName).set(req.body)
    .then(data => {
        //const transporter = nodemailer.createTransport({
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

// 404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})