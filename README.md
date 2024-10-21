[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/ArmanKhanTech/Medicomm/">
    <img src="https://github.com/ArmanKhanTech/Medicomm/assets/92728787/6e1b8187-48d7-40e9-8085-922471b1e1ca" alt="Logo" width="190" height="100">
  </a>

  <h3 align="center">Medicomm</h3>
  <p align="center">Status: Completed</p>
  <p align="center">A pharmaceutical e-commerce website.</p>

  <p align="center">
    <a href="https://github.com/ArmanKhanTech/Medicomm"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/ArmanKhanTech/Medicomm/issues">Report a Bug</a>
    ·
    <a href="https://github.com/ArmanKhanTech/Medicomm/issues">Request new Features</a>
  </p>
</div>
<br />



<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About the Project

This e-pharmacy is a business model that deals with the preparation and sale of prescription and non-prescription drugs as in traditional pharmacies. However, online pharmacies take orders online and send the drugs to their destination by post.

**Now also available on <a href="https://hub.docker.com/r/armankhan792/medicomm"><b>Docker.</b></a>**

**Ideal to view only on 1920x1080p 15-inch display since this website isn't responsive.**


### Built with

- [![HTML][HTML]][HTML-url]
- [![CSS][CSS]][CSS-url]
- [![JS][JS]][JS-url]
- [![Nodejs][Nodejs]][Nodejs-url]
- [![Expreeejs][Expressjs]][Expressjs-url]
- [![Firebase][Firebase]][Firebase-url]



## Getting Started

Run the following command in your project directory's terminal:
  
  ```javascript
  npm install
  ```


### Prerequisites

<ol>
  <li>
    <p>Node.js</a>
  </li>
  <li>
    <p>npm</a>
  </li>
  <li>
    <p>Firebase Account</a>
  </li>
</ol>


### Installation

1. Clone this repository:
   
   ```sh
   git clone https://github.com/ArmanKhanTech/Medicomm.git
   ```

2. Make the following changes in:
   <br/>
   <br />
   `a) /server.js ->`
   `Line 8` : Enter your Razorpay ID & SECRET ID here (nessecary for online payment):

   ```javascript
   const Razorpay = require("razorpay");
   const razorpay = new Razorpay({
     key_id: "YOUR RAZORPAY ID",
     key_secret: "YOUR RAZORPAY SECRET KEY",
   });
   ```

   
   `Line 13` : Enter the name of your firebase credential file here (the one you will download from your firebase console):

   ```javascript
   let serviceAccount = require("./YOUR FIREBASE SERVICE ACCOUNT KEY.json");
   ```

   
   `Line 569` : Enter the E-mail ID & password here (it will be used to send notification to customers after placing order):

   ```javascript
   let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     auth: {
       user: "YOUR EMAIL ID",
       pass: "YOUR EMAIL PASSWORD",
     },
   });
   ```
   
   `b) /js/product.js ->`
   `Line 59` : Enter your distancematrix.ai token here (or you can use Google Distance Matrix API too):

   ```javascript
   let url =
     "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&destinations=${userPin}&departure_time=now&key=YOUR TOKEN ID";
   ```
   
   `c) /js/checkout.js ->`
   `Line 64` : Enter your Razorpay ID here:

   ```javascript
   const onlineCheckout = () => {
   var options = {
       "key": "YOUR RAZORPAY KEY",
   ```


3. Run the project by typing localhost:3000/index.html in your browser.<br>

**OR**

Navigate to <a href="https://hub.docker.com/r/armankhan792/medicomm"><b>DockerHub.</b></a>



## Features

<ol>
  <li>
    Purchase or sell medicines & other products.
  </li>
  <li>
    Seller's dashboard with inventory management.
  </li>
  <li>
    Order cart & wishlist.
  </li>
  <li>
    Order tracking & history.
  </li>
  <li>
    Online payment with Razorpay.
  </li>
  <li>
    Check item's availability using pincode.
  </li>
  <li>
    Search items by name, type, category or usage.
  </li>
  <li>
    Submit grievances.
  </li>
  <li>
    Signup and Login.
  </li>
</ol>



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star!

Thanks again!



## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



## Contact

Arman Khan - ak2341776@gmail.com

Project Link - [https://github.com/ArmanKhanTech/Medicomm](https://github.com/ArmanKhanTech/Medicomm)

DockerHub Link - https://hub.docker.com/r/armankhan792/medicomm

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
