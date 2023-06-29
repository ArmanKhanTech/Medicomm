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

**Ideal to view only on 1920x1080p display since this rpoject does not yet feature bootstrap yet.**

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
    <p>Nodejs</a>
  </li>
  <li>
    <p>Expressjs</a>
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
    _Line 7 : Enter your Razorpay ID & SECRET ID here(nessecary for online payment) :_
    ```javascript
    const Razorpay = require('razorpay')
    const razorpay = new Razorpay({
        key_id: 'YOUR RAZORPAY ID',
        key_secret: 'YOUR RAZORPAY SECRET KEY'
    })
    ```
    <br>_Line 13 : Enter the name of your firebase credential file here(the one you will download from your firebase console) :_
    ```javascript
    let serviceAccount = require("./YOUR FIREBASE CREDENTIAL FILE");
    ```
    <br>_Line 577 : Enter the e-mail ID & password here(it will be used to send notification to customers after placing order) :_
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
    _Line 57 : Enter your distancematrix.ai token here(or you can use Google Distance Matrix API too) :_
    ```javascript
    let url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&destinations=${userPin}&departure_time=now&key=YOUR TOKEN ID";
    ```
    
    <br>**c. in /js/checkout.js :**<br><br>
    _Line 63 : Enter your Razorpay ID here :<br>_
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
    Purchase medicines & medical products.
  </li>
  <li>
    Seller's dashboard with order tracking & sale history.
  </li>
  <li>
    Add to cart & wishlist.
  </li>
  <li>
    Order Tracking and History along with its Cancelling.
  </li>
  <li>
    Online payment with Razorpay.
  </li>
  <li>
    Check availiblity using pincode.
  </li>
  <li>
    Search(by name, type, category or use).
  </li>
  <li>
    Submit grieviances.
  </li>
  <li>
    Sign Up and Log In
  </li>
</ol>



<!-- IMAGES -->
## Images

<div>
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/d0f46583-2c26-4743-a6ca-48ee248967c4">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/19cdc4f7-6a80-43ac-96ed-cfd9653bf01f">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/a6f16965-cb30-4817-a88e-d6389f976a1a">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/5283c517-3b05-4648-85ed-63b6d9212cda">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/299b7fe3-aa3a-4cbf-8917-f81457688e79">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/9ac3a95f-247f-49f3-92af-1b438c9ec531">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/62364801-ca82-4596-9464-7b18c7bf1965">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/b888eb26-87ed-46c9-b1fb-e06951243f97">
<img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/7c04ece5-7ab2-444e-89a9-515b18cfa882">
</div>



<!-- ROADMAP -->
## Roadmap

- [x] Add Sign up & Log in
- [x] Add Home paage
- [x] Add Prodcut landing page
- [x] Add Search page
- [x] Add Cart & wishlist
- [x] Add Seller's dashboard
- [x] Add Checkout
- [x] Add Order tracking, history & cancelletion
- [x] Add Online payment
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
[Expressjs]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Expressjs-url]: https://expressjs.com/
[Firebase]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
