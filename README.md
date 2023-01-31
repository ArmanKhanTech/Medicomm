# Medicomm

Online Medical Store(E-Commerce Pharmacy)
<br>
<br>

## Technologies Used :
a. HTML<br>
b. CSS<br>
c. JavaScript<br>
d. Nodejs(Backend)<br>
e. Expressjs(API)<br>
f. Firebase(Database)
<br>
<br>

## Features :
a. Buy<br>
b. Sell Dashboard with Order Tracking and History<br>
c. Cart/Wishlist<br>
d. Order Tracking and History along with its Cancelling<br>
e. Online Payment with Razorpay<br>
f. Check Availiblity using Pincode<br>
g. Search(By Name, Type, Category or Use)<br>
h. Submit Grieviance<br>
i. Sign Up and Log In
<br>
<br>

## Getting Started :
**Make sure to install node.js on your system , delete the previous /node_module folder & run following command in project directory's terminal:**
```javascript
npm init 
npm install express
```
<br>**a. In /server.js :**
<br><br>Line 7 : <br>
Enter your Razorpay ID & SECRET ID here<br>
```javascript
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'YOUR RAZORPAY ID',
    key_secret: 'YOUR RAZORPAY SECRET KEY'
})
```
<br>Line 13 : <br>
Enter the name of your firebase credential file here(the one you will download from firebase console)<br>
```javascript
let serviceAccount = require("./YOUR FIREBASE CREDENTIAL FILE");
```
<br>Line 577 : <br>
Enter the E-mail ID AND password here(it will be used to send notification to customer after placing order)<br>
```javascript
let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
auth: {
    user: 'YOUR EMAIL ID',
    pass: 'YOUR EMAIL PASSWORD'
  }
})
```
<br>**b. In /js/product.js :**
<br><br>Line 57 :
<br>Enter your distancematrix.ai token here(or you could use Google Distance Matrix API too)
```javascript
let url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&destinations=${userPin}&departure_time=now&key=YOUR TOKEN ID";
```
<br>**c. In /js/checkout.js**
<br><br>Line 63 :
<br>Enter your Razorpay ID here
```javascript
const onlineCheckout = () => {
    var options = {
        "key": "YOUR RAZORPAY KEY",
```
<br>Run the project by typing localhost/3000 in your browser
<br><br>

**Note : This website isn't implemented using CSS Bootstrap.
        So the only ideal display to view this website is 1920x1080p**
       

