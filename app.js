const yargs= require('yargs');


const geocode=require('./geocode/geocode.js');
const temperatureInfo=require('./tempertaure/temperature.js');


const argv=yargs.options({
a:{
    demand:true,
    alias :"address",
    describe:'Address of place to fetch weather for',
    string:true
}
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage)
    {
        console.log(errorMessage);
        
    }
    else{
        console.log(`Lattitude : ${results.lat}`);
        console.log(`Longitude : ${results.lng}`);
        temperatureInfo.getWeather(results.lat,results.lng,(errorMessage,temperature)=>{
            if(errorMessage)
            {
                console.log(errorMessage);
            }
            else{
                console.log(`Temperature of ${argv.address} is ${temperature}`);
            }
        });
    }
});