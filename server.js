const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'YOUR RAZORPAY ID',
    key_secret: 'YOUR RAZORPAY SECRET KEY'
})

let serviceAccount = require("./YOUR FIREBASE CREDENTAIL FILE");

const { randomInt } = require('crypto');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let staticPath = path.join(__dirname, "");
let db = admin.firestore();

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})


app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

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

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(staticPath, "about.html"));
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(staticPath, "contact.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    
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

    db.collection('products').doc(id).set(req.body)
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
                if(data.length != 0){
                    prArr.push(data);
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

app.post('/delete-product', (req, res) => {
    const {id} = req.body;

    db.collection('products').doc(id).delete()
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

app.post('/order-online', (req, res)=>{ 
    const {amount, currency, receipt, notes}  = req.body;

    razorpay.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
});

app.post('/disEna-product', (req, res) => {
    const {data} = req.body;

    let id='';
    let status = '';

    id = data.id;
    status = data.status;

    db.collection("products").doc(id).update({status: status});

    res.json('success');
})

app.post('/submit-query', (req, res) => {
    const {name, email, phone, message} = req.body;

    let docName = email + '-' + randomInt(10000, 99999);

    db.collection("grievance").doc(docName).set(req.body);

    res.json('success');
})

app.post('/get-date', (req, res) => {
    const {id} = req.body;
    let docref = db.collection('products').where('id', '==' ,id);
    let prArr = [];

    docref.get().then(products => {
        products.forEach(items => {
            let data = items.data();
            data.id = items.id;
            if(data.length != 0){
                prArr.push(data);
            }
        });
    }).then(() => {
        res.json(prArr);
    })
})

app.post('/cancel-order', (req, res) => {
    const {order, email} = req.body;

    let docref = db.collection("orders")
    .where("email", "==", email)
    .where("order", "array-contains", order);
    
    docref.get().then(orders => {
        orders.forEach(items => {
            let data = items.data();
            for(let i=0; i<data.order.length; i++){
                if(data.order[i].id == order.id){
                    data.order[i].status = 'Cancelled';
                    db.collection("orders").doc(items.id).update({
                        order: data.order
                    });
                }
            }
        })
    }).then(() => {
        res.json('success');
    })

})

app.post('/update-status', (req, res) => {
    const {order, email} = req.body;

    if(order.status == 'Waiting for Dispatch'){
        let docref = db.collection("orders")
        .where("email", "==", email)
        .where("order", "array-contains", order);
        
        docref.get().then(orders => {
            orders.forEach(items => {
                let data = items.data();
                for(let i=0; i<data.order.length; i++){
                    if(data.order[i].id == order.id){
                        data.order[i].status = 'Out for Delivery';
                        db.collection("orders").doc(items.id).update({
                            order: data.order
                        });
                    }
                }
            })
        }).then(() => {
            res.json('success');
        })
    } else if(order.status == 'Out for Delivery'){
        let docref = db.collection("orders")
        .where("email", "==", email)
        .where("order", "array-contains", order);
        
        docref.get().then(orders => {
            orders.forEach(items => {
                let data = items.data();
                for(let i=0; i<data.order.length; i++){
                    if(data.order[i].id == order.id){
                        data.order[i].status = 'Delivered';
                        db.collection("orders").doc(items.id).update({
                            order: data.order
                        });
                    }
                }
            })
        }).then(() => {
            res.json('success');
        })
    }

})
    
app.post('/fetch-orders', (req, res) => {
    const {email} = req.body;

    let docref = db.collection('orders').where('email', '==' ,email);
    let prArr = [];

    docref.get().then(orders => {
        orders.forEach(items => {
            let data = items.data();
            data.id = items.id;
            if(data.length != 0){
                prArr.push(data);
            } else{
                res.json('no-orders');
            }
        });
    }).then(() => {
        res.json(prArr);
    })
})

app.post('/get-orders', (req, res) => {
    let prArr = [];

    let docref1 = db.collection('orders');

    docref1.get().then(orders => {    
        orders.forEach(items => {
            let data = items.data();
            data.id = items.id;
            if(data.length != 0){
                prArr.push(data);
            } else{
                res.json('no-orders');
            }
        });
    }).then(() => {
        res.json(prArr);
    })
})

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.get('cart', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})

app.get('/search', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(staticPath, "checkout.html"));
})

app.post('/order', (req, res) => {
    const { email, order, address, mode, status} = req.body;
    let docName = email + '-' + randomInt(10000, 99999);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: 'YOUR EMAIL ID',
            pass: 'YOUR EMAIL PASSWORD'
        }
    })

    const mailOptions = {
        from: 'YOUR EMAIL ID',
        to: email,
        subject: 'Order Confirmation',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            
                <head>
                
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE-edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                    <title>Medicomm</title>

                    <style>
                    
                        body{
                            background-color: #f2f2f2;
                            min-height: 90vh;
                            font-family: sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .heading{
                            text-align: center;
                            font-size: 40px;
                            margin: 30px auto 60px;
                            width: fit-content;
                            display: block;
                            line-height: 50px;
                        }
                        .span{
                            text-align: center;
                            font-size: 20px;
                            margin: 30px auto 60px;
                            width: fit-content;
                            display: block;
                            line-height: 30px;
                        }
                        .btn{
                            display: block;
                            margin: 0 auto;
                            padding: 10px 20px;
                            background-color: #f2f2f2;
                            border: 1px solid #000;
                            border-radius: 5px;
                            font-size: 20px;
                            cursor: pointer;
                        }
                        
                    </style>
                    
                </head>

                <body>

                    <div class="mail">
                    
                        <h1 class="heading">Thank You For Shopping With Us</h1>
                        
                        <p class="span">Your Order Has Been Placed Successfully. We Will Contact You Soon.</p>
                        
                        <p class="span">Regards, Medicomm</p>
                        
                        <button class="btn">Check Status</button>
                        
                    </div>

                    <script>

                    </script>
                    
                </body>

            </html>
        `
    }

    db.collection('orders').doc(docName).set(req.body)
    .then(data => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err);
               res.json({'alert': 'Opps! It seems like there is some problem with our server. Please try again later.'});
            } else{
                res.json({'alert': 'Your Order Was Placed Successfully.'});
            }
        })
    }).catch(err => {
        res.json('err');
    })
})

app.post('/update-stock', (req, res) => {
    const {id , stock} = req.body;

    db.collection("products").doc(id).update({stock: stock});
})

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})
