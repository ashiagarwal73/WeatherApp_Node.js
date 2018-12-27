const request =require('request');

const keyWeather='97e95ca21d7d72fce1955d7b904a2540';
var getWeather=(lat,lng,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/${keyWeather}/${lat},${lng}`,
        json:true
    },(error,response,body)=>{
        if(error){
            callback("Unable to connect to Server");
        }
        else if(response.statusCode===400){
                callback("Temprature not available");
            }
        else if(response.statusCode===200){
                callback(undefined,body.currently.temperature);
            }
    });
};
module.exports.getWeather=getWeather;