//express is our webframe work for our back end 
const express = require('express')
const app = express()
const port = 8081


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
//api middlewares 
app.use(express.json()); //this is to accept data in json format 
app.use(express.urlencoded({extended: false})); // this is to decode data sent through html form 
app.use(express.static( 'publichtml'))


//get something from server(backened) and front end
app.get('/',(req,res) => 
                 {res.sendFile(__dirname + '/publichtml/index.html')})

//get something from client and send to backend 
app.post('/', (req,res)=>{ 
   
     console.log(JSON.stringify(req.body ))

     res.sendFile(__dirname + '/publichtml/thanks.html')
    // console.log(JSON.stringify({ x: 5, y: 6 })); convert javascript to JSON
    

})




app.listen (port,()=> console.log(`listening on port: ${port} `))


