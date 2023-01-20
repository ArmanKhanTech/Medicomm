# Medicomm

Online Medical Store(E-Commerce Pharmacy)

**Technologies Used :**<br>
a. HTML<br>
b. CSS<br>
c. JavaSc<br>
d. Nodejs(Backend)<br>
e. Expressjs(API)<br>
f. Firebase(Database)<br>

**Features :**<br>
a. Buy<br>
b. Sell Dashboard with Order Tracking and History<br>
c. Cart/Wishlist<br>
d. Order Tracking and History along with its Cancelling<br>
e. Online Payment with Razorpay<br>
f. Check Availiblity using Pincode<br>
g. Search(By Name, Type, Category or Use)<br>
h. Submit Grieviance<br>
i. Sign Up and Log In

**Changes to be done :**<br>
a. In server.js <br>
        On line 7 : <br>
        ```
        const Razorpay = require('razorpay')<br>
        const razorpay = new Razorpay({<br>
            key_id: 'YOUR RAZORPAY ID',<br>
            key_secret: 'YOUR RAZORPAY SECRET KEY'<br>
        })<br>
        ```
        On line 13 :<br>
        ```
        let serviceAccount = require("./YOUR FIREBASE CREDENTAIL FILE");<br>
        ```
b. In js/product.js<br>

**Images :**<br>
**a. Home Page :**<br><br>
<kbd>
![mainpage](https://user-images.githubusercontent.com/92728787/213473781-ada15585-fc68-41ae-bd5f-223312995798.png)
</kbd>
<br>

**b. Search Page :**<br><br>
<kbd>
![searchpage](https://user-images.githubusercontent.com/92728787/213467715-b503f450-02a0-4eb1-b5b6-4f1ac306ddc7.png)
</kbd>
<br>

**c. Order Page :**<br><br>
<kbd>
![orderpage](https://user-images.githubusercontent.com/92728787/213467821-59f9ebad-8a9a-48d0-801a-d8c452aa0e80.png)
</kbd>
<br>

**d. Seller Dashboard :**<br><br>
<kbd>
![sellerdashboard1](https://user-images.githubusercontent.com/92728787/213467967-11a91cda-6bea-4884-b094-950022ddcd1d.png)<br>
</kbd>
<br>
<kbd>
![sellerdashboard2](https://user-images.githubusercontent.com/92728787/213476767-88dd6684-f9dc-4525-b763-6879880348c5.png)<br>
</kbd>
<br>
<kbd>
![sellerdashboard3](https://user-images.githubusercontent.com/92728787/213476840-6f4a35ea-6db8-4e8a-a320-232cb7c7c84c.png)<br>
</kbd>
<br>

**New Product :**<br><br>
<kbd>
![addproductpage](https://user-images.githubusercontent.com/92728787/213468113-4951938f-006c-426f-85d3-2e176677b94c.png)
<kbd>
<br>

**e. Product Landing :**<br><br>
<kbd>
![productpage](https://user-images.githubusercontent.com/92728787/213469881-baf4121c-cb6f-492d-856f-9e20a5f990f3.png)
</kbd>
<br>

**f. About :**<br><br>
<kbd>
![aboutuspage](https://user-images.githubusercontent.com/92728787/213468179-1f6e29ff-bdee-4a61-b79c-554018e9c46c.png)
</kbd>
<br>

**g. Grieviance :**<br><br>
<kbd>
![contactpage](https://user-images.githubusercontent.com/92728787/213468314-95368d89-3ac9-4632-a500-50a236801f13.png)
</kbd>
<br>

**h. Sign Up and Log In :**<br><br>
<kbd>
![signuppage](https://user-images.githubusercontent.com/92728787/213468410-cd43e13e-d895-480b-b636-61038c33af55.png)<br>
</kbd>
<br>
<kbd>
![loginpage](https://user-images.githubusercontent.com/92728787/213468445-773e4e71-6704-41bc-a293-21b15500842f.png)
</kbd>
<br>

**i. Cart :**<br><br>
<kbd>
![cartpage](https://user-images.githubusercontent.com/92728787/213468519-40219b6e-7ac5-4b27-9bea-ba6790260120.png)
</kbd>
<br>

**j. Checkout and Online Payment :**<br><br>
<kbd>
![checkoutpage](https://user-images.githubusercontent.com/92728787/213468614-a5636c99-cc80-4910-91ef-47ffe4177138.png)<br>
![onlinepaymentpage](https://user-images.githubusercontent.com/92728787/213468648-4b3ab7eb-65df-4699-a94e-d8ef5495e44a.png)
</kbd>
<br>

**Note : This website isn't implemented using CSS Bootstrap.
        So the only ideal display to view this website is 1920x1080p**
       

