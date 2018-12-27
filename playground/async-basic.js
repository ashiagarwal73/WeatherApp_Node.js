console.log("Starting up");

setTimeout(() => {
    console.log("Inside a timeout");
}, 1000);
setTimeout(() => {
    console.log("Inside 0 timeout");
    
}, 0);
console.log("Finishing up");

