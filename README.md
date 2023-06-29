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
    <li><a href="#usage">Usage</a></li>
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
    <br>**a. In /server.js :**<br><br>
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
    
    <br>**b. In /js/product.js :**<br><br>
    _Line 57 : Enter your distancematrix.ai token here(or you can use Google Distance Matrix API too) :_
    ```javascript
    let url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&destinations=${userPin}&departure_time=now&key=YOUR TOKEN ID";
    ```
    
    <br>**c. In /js/checkout.js :**<br><br>
    _Line 63 : Enter your Razorpay ID here :<br>_
    ```javascript
    const onlineCheckout = () => {
    var options = {
        "key": "YOUR RAZORPAY KEY",
    ```
    <br>
3. Run the project by typing localhost:3000/index.html in your browser.<br>



<!-- USAGE EXAMPLES -->
## Usage

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/dce6794f-b0ff-4b22-b2fa-a14337f2f012" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/13b11040-ba6a-4bde-988e-0e29a0e1d2ad" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/c98548d2-3203-4f9a-a3c4-4daf36810b3f" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/07357593-40c2-43a6-9b8f-b0cb7e475b7e" alt="Logo" width="300" height="600">
</div>

<h3>1. Daily Doze :</h3>
<ul>
  <li>
    <p>Daily Doze contains the checklist of all the healthy food you should include in your daily diet inorder to live a healthy life. Based on Dr. Greger's How Not to Die.</p>
  </li>
  <li>
    <p>It also inputs your daily sleep duration allowing you to keep track of it. Click on the moon icon to do so.</p>
  </li>
  <li>
    <p>By clicking on previous button you can goto the previous day from the current day to check out your stats for that day.</p>
  </li>
    <li>
    <p>Similarly, you can goto the next day from the current day to check out your stats for that day.</p>
  </li>
  <li>
    <p>You can jump back to ongoing day by clicking on Back to Today button.</p>
  </li>
  <li>
    <p>Once the day has passed you cannot alter your checklist.</p>
  </li>
  <li>
    <p>Total serving counter is maintained at the top & you can goto the graph by clicking the button next to it.</p>
  </li>
  <li>
    <p>The graph allows you to co-relate your daily sleep duration with your total daily servings.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/74d909b3-fb03-4222-9719-f8257ff6bc06" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/16216112-3d4d-4549-b7e9-d58b6ad9b61a" alt="Logo" width="300" height="600">
</div>
<h3>2. Menu :</h3>
<ul>
  <li>
    <p>21 Tweaks : Goto 21 Tweaks challenge activity.</p>
  </li>
  <li>
    <p>Jump to a Date : Directly jump to any day you want inorder to check your daily servings stats for that day.</p>
  </li>
  <li>
    <p>Notifications : Goto Notifications activity.</p>
  </li>
  <li>
    <p>Meditation : Goto Meditation activity.</p>
  </li>
    <li>
    <p>Fast-Watch : Goto Fast-Watch activity.</p>
  </li>
  <li>
    <p>Backup : Goto Backup activity.</a>
  </li>
  <li>
    <p>Open Source : Redirect to this repo.</a>
  </li>
  <li>
    <p>About : Goto About Activity.</a>
  </li>
  <li>
    <p>Logout : Logout.</a>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/7020d3c5-c984-4d60-8766-243c5a83171b" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/9b357d28-256c-4da5-9b28-e5b10326ae7f" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/00e1ff92-e1a0-4e26-8b62-f3e2ba9e6bad" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/3a7f2149-b965-4737-b679-9dad5e692679" alt="Logo" width="300" height="600">
</div>
<h3>3. 21 Tweaks :</h3>
<ul>
  <li>
    <p>Dr. Greger extracted the most important information from his extensive study and put together a mini list of tips and tricks you should perform every day in order to lose weight.</p>
  </li>
  <li>
    <p>21 Tweaks is 21 day challenge one should strictly follow to lose weight.</p>
  </li>
  <li>
    <p>It is divide into three sections Each Day, Each Meals & Each Night.</p>
  </li>
  <li>
    <p>These three sections contain information about the diet you should follow & certain activities you should perform at specific time.</p>
  </li>
    <li>
    <p>You also have to input your weight twice a day by clicking on weight icon. This icon is visible only in morning & night.</p>
  </li>
 <li>
    <p>By clicking on previous button you can goto the previous day from the current day to check out your stats for that day.</p>
  </li>
  <li>
    <p>Similarly, you can goto the next day from the current day to check out your stats for that day.</p>
  </li>
  <li>
    <p>You can jump back to ongoing day by clicking on Back to Today button.</p>
  </li>
  <li>
    <p>Once the day has passed you cannot alter your checklist.</p>
  </li>
  <li>
    <p>Total serving counter is maintained at the top & you can goto the graph by clicking the button next to it.</p>
  </li>
  <li>
    <p>The graph allows you to co-relate your daily average weight with your total daily tweakss.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/816db7d3-8d61-4dcd-a86c-009bc08e164e" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/e5d7740f-3cba-462e-9820-e2ed565df5bb" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/00f8f9c0-2e1d-4454-97d0-f182a5738a67" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/7f92b4fc-9e9e-4376-aae4-79fc70b0a1e9" alt="Logo" width="300" height="600">
</div>
<h3>4. Notifications :</h3>
<ul>
  <li>
    <p>This feature allows the app to notify you to update your daily servings at appropriate time set by you.</p>
  </li>
  <li>
    <p>This feature requires notification permission so allow it when prompted.</p>
  </li>
  <li>
    <p>Turn on the notifications by clicking on the switch & add new notification by click on Add Notification icon at the top.</p>
  </li>
  <li>
    <p>You can delete a notification by simply clicking on it.</p>
  </li>
    <li>
    <p>You can also disable the notifications by clicking on the switch again.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/14fc06cb-7bb5-4217-8ae2-1f0a557fdc85" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/0c157bdb-d194-41e8-92c1-ca484f42cb05" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/da8946f5-262f-44d7-9162-1b4f78b85ecf" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/1751a12b-b233-4a31-bbe9-8597afa73241" alt="Logo" width="300" height="600">
</div>
<h3>5. Meditation :</h3>
<ul>
  <li>
    <p>This feature assists you in your daily meditation & helps you keep track of it.</p>
  </li>
  <li>
    <p>Simply click on play icon to start meditating.</p>
  </li>
  <li>
    <p>You can to choose to meditate for 15 mins to 1 hour.</p>
  </li>
  <li>
    <p>You can also view your daily meditation history by clicking on any day in the history section. The list is sorted in descending order by default.</p>
  </li>
    <li>
    <p>You can also customize your meditation screen by changing its background image & you can also change the background music according to your likings by clicking on settings icon on top.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/3cce92cf-db0b-415b-98c7-fe8fffc4d9e5" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/566f85b6-e08f-4f0e-b7ce-ca7436af53a8" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/a326e538-c913-4168-9722-42824b1fba3f" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/c017b209-caf2-4539-af3c-374313cbb492" alt="Logo" width="300" height="600">
</div>
<h3>6. Fast-Watch :</h3>
<ul>
  <li>
    <p>This feature allows you to keep track of your daily fasting.</p>
  </li>
  <li>
    <p>Simply click on start button to start fast-watch.</p>
  </li>
  <li>
    <p>You can to choose to fast for 3 hours to 12 hours.</p>
  </li>
  <li>
    <p>You can also view your daily fasting history by clicking on any day in the history section. The list is sorted in descending order by default.</p>
  </li>
    <li>
    <p>This feature also requires notification permission so allow it if prompted.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/9d242a0a-45e4-4ded-b6a1-bb9178f4cc94" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/89e10d40-ddce-4bbc-b0df-8fe0a35dfea3" alt="Logo" width="300" height="600">
</div>
<h3>7. Backup :</h3>
<ul>
  <li>
    <p>This feature allows you to take backup(export) of your data or import it so you don't have to worry about losing it.</p>
  </li>
  <li>
    <p>Simply click on import buttton to import your data.</p>
  </li>
  <li>
    <p>Or click on export button to export your data.</p>
  </li>
  <li>
    <p>Please read the given instructions carefully to avoid mishaps.</p>
  </li>
  <li>
    <p>All the user data is stored in local sqlite database. Thus, the backup files have .db extension.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/fbd15889-6e72-487d-b3d8-9cb111f0324e" alt="Logo" width="300" height="600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/53296e54-c127-4b0a-8a3c-f9924dfcb21d" alt="Logo" width="300" height="600">
</div>
<h3>8. Info :</h3>
<ul>
  <li>
    <p>Information about any serving or tweak can viewed by clicking on the info icon of corresponding serving or tweak.</p>
  </li>
</ul>
<br>

<div>
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/c9940b8f-466e-4336-8cc4-2d6d7fe87de6" alt="Logo" width="300" height=600">
<img src="https://github.com/ArmanKhanTech/DailyDoze/assets/92728787/22bc9d17-b360-447c-a8e7-3f4436f7aa79" alt="Logo" width="300" height="600">
</div>
<h3>9. Login & Registration :</h3>
<ul>
  <li>
    <p>Simple login & registration page.</p>
  </li>
  <li>
    <p>The registration page also features the auto-location feature.</p>
  </li>
  <li>
    <p>Registration is mandatory for the access to the app.</p>
  </li>
  <li>
    <p>All your data will be stored in Firebase Realtime DB.</p>
  </li>
  <li>
    <p>Your data will help us improve & implement machine learning models in the app in future.</p>
  </li>
</ul>
<br>



<!-- ROADMAP -->
## Roadmap

- [x] Add Login & Registration
- [x] Add Daily Doze
- [x] Add Info
- [x] Add Menu
- [x] Add 21 Tweaks
- [x] Add Notifications
- [x] Add Meditation
- [x] Add Fast-Watch
- [x] Add Animations
- [x] Add Backup
- [ ] Add Calender

See the [open issues](https://github.com/ArmanKhanTech/DailyDoze/issues) for a full list of proposed features (and known issues)



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

Project Link - [https://github.com/ArmanKhanTech/DailyDoze](https://github.com/ArmanKhanTech/DailyDoze)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Dr Greger's Daily Dozen](https://github.com/nutritionfactsorg/daily-dozen-android)

**3rd Party Libraries**
* [Phil Jay's MPAndroidChart](https://github.com/PhilJay/MPAndroidChart)
* [Lottie Animations](https://github.com/airbnb/lottie-android)
* [Daniel Martinus's Konfetti](https://github.com/DanielMartinus/Konfetti)
* [Ozcan Alsalvar's Datepicker](https://github.com/OzcanAlasalvar/DatePicker)



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
[Firebase-url]: https://firebase.google.com

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

**Note : This website isn't implemented using CSS Bootstrap.
        So the only ideal display to view this website is 1920x1080p**
       

