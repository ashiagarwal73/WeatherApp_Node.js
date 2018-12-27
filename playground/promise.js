var asyncAdd =(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof(a)==='number'&&typeof(b)==='number')
        {
            var c =a+b;
            resolve(c);
        }
        else{
            reject("Not a Number");
        }
    });
};
asyncAdd(8,7).then((result)=>{
        return asyncAdd(result,30);
    }).then((result)=>{
        console.log("Result sholud be 45 "+ result);
            
     }).catch((error)=>{
        console.log("Failure :"+error);
     });
// asyncAdd(8,7).then((result)=>{
//     //console.log("Results :"+result);
//     return asyncAdd(result,30);
    
// },(error)=>{
//     console.log("Failure :"+error);
    
// }).then((result)=>{
//     console.log("Result sholud be 45 "+ result);
    
// },(error)=>{
//     console.log(error);
// });



// var somePromise= new Promise((resolve,reject)=>{
//     resolve("hey it worked");

//    //reject("hey it did not worked");
// });
// somePromise.then((message)=>{
//     console.log("Success "+message);
    
// },(error)=>{
//     console.log("Failure "+error);
    
// });