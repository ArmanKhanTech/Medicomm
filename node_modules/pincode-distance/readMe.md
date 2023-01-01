## Pincode Distance
    This module provides distance between pincodes for India, It uses Havershine formula to
    calculate the distance's
### Usage
  1. Install using
      ```npm i pincode-distance``` or ```yarn add pincode-distance```
  2. Import the package
      ```import pincode from "pincode-distance"```
  3. Initialize the class
      ```const Pincode = new pincode();```

### Methods
  1. getDistance(arg1, arg2) : provides distance two pincodes
      ```
      const distance = Pincode.getDistance("4000093", "4000083");
      ```
  2. getlatLng(pincode): return's geocoords for the given pincode
      ```
      const location = Pincode.getlatLng("4000093");
      ```