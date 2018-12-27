const yargs= require('yargs');
const axios=require('axios');
const fs = require('fs');

const keyLocation='g1cqglabHH1I37P9nn95QguKa9mQFE6t';
const keyWeather='97e95ca21d7d72fce1955d7b904a2540';


const argv=yargs.options({
a:{
    demand:false,
    alias :"address",
    describe:'Address of place to fetch weather for',
    string:true
},
d:{
    demand:false,
    alias :"default_address",
    describe:'Address of default place to fetch weather for',
    string:true
}
})
.help()
.alias('help','h')
.argv;
var encodedAddress;
var default_address;
var fetchDefault= ()=>{
    try {
      var default_address=fs.readFileSync('default.json');
      return JSON.parse(default_address);
    } catch (e) {
      return [] ;
    }
  };
default_address=fetchDefault().address;

if(!argv.address)
{
    if(!argv.default_address)
    {
        if(default_address)
        {
            encodedAddress=encodeURIComponent(default_address);
        }
        else{
            console.log("Please provide Adress or set default");
            return;
        }
    }
    else{
        fs.writeFileSync('default.json',JSON.stringify({
            address: argv.default_address
        }));
        console.log('Set Default Adress');
        encodedAddress=encodeURIComponent(argv.default_address);
    }
}
else{
    encodedAddress=encodeURIComponent(argv.address);
}

var geocodeUrl=`http://www.mapquestapi.com/geocoding/v1/address?key=${keyLocation}&location=${encodedAddress}`;
axios.get(geocodeUrl).then((response)=>{
    if(response.data.info.statuscode===400)
    {
        throw new Error("Unable to find Address");
    }
    var lat=response.data.results[0].locations[0].latLng.lat;
    var lng=response.data.results[0].locations[0].latLng.lng;
    var weatherUrl=`https://api.darksky.net/forecast/${keyWeather}/${lat},${lng}`;
    return new axios.get(weatherUrl);
}).then((response)=>{
    if(response.data.statusCode===400){
        throw new Error("Temperature not Available");
    }
    console.log("Temperature :"+response.data.currently.temperature);
}).catch((error)=>{
    if(error.code==='ENOTFOUND'){
        console.log("Unable to Connect to server");
    } 
    else{
        console.log(error.message);
    }
});
