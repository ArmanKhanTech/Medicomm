### PINCODE DISTANCE CALCULATOR

Thanks for visiting by mistake.

#### Installation

```js
npm install pincode-distance-calculator
```

#### Usage

```js
const Distance = require('pincode-distance-calculator')

let result = Distance.getDistance(110045,643231) 
//console logging result will return promise { <pending> }

result.then((distance) =>{
    console.log(distance) // will console log the distance
})
```

#### Theory

The Distance calculator takes two pincodes as arguments in the getDistance function.
An API call is made to get the latlong data of both the pincodes.

The distance is calculated using the Haversine formula which is used to calculate distance between two co-ordintes on a sphere.
[more on Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)

<hr>


#### Caveats
NOTE : The distance which is returned is not the distance by road, it is instead a distance between two points using a straight line.

![image](https://qph.fs.quoracdn.net/main-qimg-f162f269d994dd060ef9e95cca7b294a)


The function will return the path2 distance in most cases.

This package is good to calculate a distance matrix for comparisons from a single origin.
For example : 

we have 3 origins and 1 destination, this package can be used to find the closest pincode to that destination.