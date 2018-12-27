const request= require('request');

const keyLocation='g1cqglabHH1I37P9nn95QguKa9mQFE6t';
var geocodeAddress=(address,callback)=>{
var encodedAddress=encodeURIComponent(address);
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=${keyLocation}&location=${encodedAddress}`,
        json:true
    },(error,response,body)=>{
        if(error)
        {
            callback("Unable to connect to servers");
        }
        else if(body.info.statuscode===400)
        {
            callback('Place not Found');
            
        }
        else if(response.statusCode===200){
            callback(undefined,body.results[0].locations[0].latLng);
        }
    });
};
module.exports.geocodeAddress=geocodeAddress;