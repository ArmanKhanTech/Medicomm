const  PincodeDistance =  require("./lib/index").default
const PinDistance = new PincodeDistance();
const distance = PinDistance.getDistance("400093", "400094");
console.log(`distance btw "400093", "400094" is ${distance}`);