[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ArmanKhanTech/Medicomm/">
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/6e1b8187-48d7-40e9-8085-922471b1e1ca" alt="Logo" width="190" height="100">
  </a>

  <h3 align="center">Medicomm</h3>

  <p align="center">
    A pharmacy e-commerce website.
    <br />
    <a href="https://github.com/ArmanKhanTech/Medicomm"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ArmanKhanTech/Medicomm/issues">Report a Bug</a>
    ·
    <a href="https://github.com/ArmanKhanTech/Medicomm/issues">Request new Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#images">Images</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This e-pharmacy is a business model that deals with the preparation and sale of prescription and non-prescription drugs as in traditional pharmacies. However, online pharmacies take orders online and send the drugs to their destination by post.

**Ideal to view only on 1920x1080p display since this websits isn't responsive.**

### Built With

* [![HTML][HTML]][HTML-url]
* [![CSS][CSS]][CSS-url]
* [![JS][JS]][JS-url]
* [![Nodejs][Nodejs]][Nodejs-url]
* [![Expreeejs][Expressjs]][Expressjs-url]
* [![Firebase][Firebase]][Firebase-url]



<!-- GETTING STARTED -->
## Getting Started

Make sure you have installed node.js on your system, delete the previous /node_module folder & run the following command in your project directory's terminal :
```javascript
npm init 
```


### Prerequisites

<ol>
  <li>
    <p>Node.js</a>
  </li>
  <li>
    <p>Express.js</a>
  </li>
</ol>



### Installation

1. Clone this repo : 
    ```sh
    git clone https://github.com/ArmanKhanTech/Medicomm.git
    ```
   <br>
2. Make the following changes : <br>
    <br>**a. in /server.js :**<br><br>
    Line 7 : Enter your Razorpay ID & SECRET ID here (nessecary for online payment) :
    ```javascript
    const Razorpay = require('razorpay')
    const razorpay = new Razorpay({
        key_id: 'YOUR RAZORPAY ID',
        key_secret: 'YOUR RAZORPAY SECRET KEY'
    })
    ```
    <br>Line 13 : Enter the name of your firebase credential file here (the one you will download from your firebase console) :
    ```javascript
    let serviceAccount = require("./YOUR FIREBASE SERVICE ACCOUNT KEY.json");
    ```
    <br>Line 577 : Enter the E-mail ID & password here (it will be used to send notification to customers after placing order) :
    ```javascript
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: 'YOUR EMAIL ID',
            pass: 'YOUR EMAIL PASSWORD'
        }
    })
    ```
    
    <br>**b. in /js/product.js :**<br><br>
    Line 57 : Enter your distancematrix.ai token here (or you can use Google Distance Matrix API too) :
    ```javascript
    let url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&destinations=${userPin}&departure_time=now&key=YOUR TOKEN ID";
    ```
    
    <br>**c. in /js/checkout.js :**<br><br>
    Line 63 : Enter your Razorpay ID here :<br>
    ```javascript
    const onlineCheckout = () => {
    var options = {
        "key": "YOUR RAZORPAY KEY",
    ```
    <br>
3. Run the project by typing localhost:3000/index.html in your browser.<br>



<!-- FEATURES -->
## Features 

<ol>
  <li>
    Purchase or Sell medicines & other medical products.
  </li>
  <li>
    Seller's Dashboard with Order Tracking & Sales History.
  </li>
  <li>
    Add to Cart & Wishlist.
  </li>
  <li>
    Order Tracking & History along with its Cancelling.
  </li>
  <li>
    Online Payment with Razorpay.
  </li>
  <li>
    Check Availiblity using Pincode.
  </li>
  <li>
    Search (by name, type, category or use).
  </li>
  <li>
    Submit Grieviances.
  </li>
  <li>
    SignUp and LogIn
  </li>
</ol>



<!-- IMAGES -->
## Images

<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/be677845-97d5-43d7-8e03-663747e5a399">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/8bdee089-1bfb-4c0e-8565-1bf828843466">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/e5e4d02a-5b1a-483e-b1ab-e3ebec1d6e3b">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/e0289443-9699-4d77-86a8-e3e000e672ec">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/f462cc7b-167a-40a1-aad2-9a70c7644030">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/9ac3a95f-247f-49f3-92af-1b438c9ec531">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/ba2b930b-0d1c-4925-9c0b-b447cf3f62bc">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/c96962a6-ef54-4612-9428-e616986b73f1">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/7c04ece5-7ab2-444e-89a9-515b18cfa882">
  </kbd>
</div>
<br>
<div>
  <kbd>
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/7af9cadf-f51c-4fd6-9589-0b9c7a928152">
  </kbd>
</div>




<!-- ROADMAP -->
## Roadmap

- [x] Add Signup & Login
- [x] Add Home Page
- [x] Add Prodcut Landing Page
- [x] Add Search Page
- [x] Add Cart & Wishlist
- [x] Add Seller's Dashboard
- [x] Add Checkout
- [x] Add Order Tracking, History & Cancelletion
- [x] Add Online Payment
- [x] Add Grievances

See the [open issues](https://github.com/ArmanKhanTech/Medicomm/issues) for a full list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! 

Thanks again!



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Arman Khan - ak2341776@gmail.com

Project Link - [https://github.com/ArmanKhanTech/Medicomm](https://github.com/ArmanKhanTech/Medicomm) 



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/ArmanKhanTech/Medicomm.svg?style=for-the-badge
[contributors-url]: https://github.com/ArmanKhanTech/Medicomm/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ArmanKhanTech/Medicomm.svg?style=for-the-badge
[forks-url]: https://github.com/ArmanKhanTech/Medicomm/network/members
[stars-shield]: https://img.shields.io/github/stars/ArmanKhanTech/Medicomm.svg?style=for-the-badge
[stars-url]: https://github.com/ArmanKhanTech/Medicomm/stargazers
[issues-shield]: https://img.shields.io/github/issues/ArmanKhanTech/Medicomm.svg?style=for-the-badge
[issues-url]: https://github.com/ArmanKhanTech/Medicomm/issues
[license-shield]: https://img.shields.io/github/license/ArmanKhanTech/Medicomm.svg?style=for-the-badge
[license-url]: https://github.com/ArmanKhanTech/Medicomm/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/arman-khan-25b624205/
[HTML]: https://img.shields.io/badge/HTML-FFA500?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://www.w3schools.com/html/
[CSS]: https://img.shields.io/badge/CSS-A020F0?&style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://www.w3schools.com/css/
[JS]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JS-url]: https://www.w3schools.com/js/
[Nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/
[Expressjs]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Expressjs-url]: https://expressjs.com/
[Firebase]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
