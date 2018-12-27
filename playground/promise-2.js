var request =require('request');
 
const keyLocation='g1cqglabHH1I37P9nn95QguKa9mQFE6t';
var geocodeAddress=(address)=>{
    return new Promise((resolve,reject)=>{
        var encodedAddress=encodeURIComponent(address);
        request({
            url:`http://www.mapquestapi.com/geocoding/v1/address?key=${keyLocation}&location=${encodedAddress}`,
            json:true
        },(error,response,body)=>{
            if(error)
            {
                reject("Unable to connect to servers");
            }
            else if(body.info.statuscode===400)
            {
                reject('Place not Found');
                
            }
            else if(response.statusCode===200){
                resolve(body.results[0].locations[0].latLng);
            }
        });
    });
};
geocodeAddress('Triveni nagar 3 Lucknow').then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
    
},(errorMessage)=>{
    console.log(errorMessage);
    
})