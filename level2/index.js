'use strict';




const yelp = require('yelp-fusion');
const apiKey = 'sLmrrMlQFc1hPeZLPqUaBmXZ4-ML0kLWY2RLHpamahLKyc4-__SHwcXpOGzGQdl6HMa2unTt3MQ3xg1W2lM9KbWPbwi3YVPv4vrQgd48VGG8QkdNtPClkj7W4YpRZHYx';
const endpoint = '  https://api.yelp.com/v3/businesses/search'
const offsetnum = 20;




const express = require('express');
const app = express();
const path = require("path");
var zipcode = "";




app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))








app.get('/getzipcode', function(req, res){
  zipcode = req.query.zipcode;
  //print out zipcode entered on console
  console.log(zipcode);




  var searchRequest = {
    term:'food',
    location: zipcode,
    offset: offsetnum
    }
   const client = yelp.client(apiKey);
 
 




  client.search(searchRequest).then(response => {
    const results = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(results, null, 4);
   


    var restlist = [];
    for (var i = 0; i < offsetnum; i++){
      var restname = results[i]["name"];
      restlist.push(restname);
    }


    //print out number of restraunt array into console log
    console.log(restlist);
    //select a restaurant
    //generate random number 1-20
    var ranNum = Math.floor(Math.random() * 20);
    var selectedres = restlist[ranNum];
    //var selectedres = getRest(restlist);
    console.log(response.jsonBody.businesses[ranNum]);


    const firstResults =  response.jsonBody.businesses[ranNum].rating;
    const priceResult = response.jsonBody.businesses[ranNum].price;
    const urlResult =  response.jsonBody.businesses[ranNum].url;
    const imageResult =  response.jsonBody.businesses[ranNum].image_url;
    const locationResult  =  response.jsonBody.businesses[ranNum].location.display_address;
    //make json readable
   // const prettyJson2 = JSON.stringify(priceResult, null, 4);
    //make an array to hold the restrants generatated
 
    //print selected restaurant onto console
    console.log(selectedres);
   
   
    //add a button here for redirection
   
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1><center><FONT COLOR= 033E5A> You may like this restaurant: '+ selectedres +'</center></h1>');
    res.write('<a href=""><center><input type="button" value=" next option"></center></a>');
    res.write('<h2><center> Location: '+ locationResult+'</center></h2>');
    res.write('<h3><center> Rating: '+ firstResults+'</center></h3>');
    res.write('<h4><center> Price: '+ priceResult+'</center></h4>');
    res.write('<center><img src= '+imageResult+' ></center>');
    res.write('<h5><center>url: '+ urlResult+'</center></h5>');
   
    //res.write('<button style = ')
    res.write('<body style= "background-color:rgb(255, 255, 255)"</body>');
   
    res.end();


 
  }).catch(e => {
    console.log(e);
  });








});








app.listen(8081, () => console.log('Example app listening on port 8081!'))






// from https://www.yelp.com/developers/v3/manage_app













