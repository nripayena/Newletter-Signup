const express = require("express");
const bodyParser = require("body-parser");
const request = require("superagent");
const https = require("https");
const path = require('path')




const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
 })



    var mailchimpInstance   = 'us14',
    listUniqueId        = 'b35fb817a2',
    mailchimpApiKey     = '81b0b1c93137bef8426dd39064e4f4fe-us14';

app.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.fName,
            'LNAME': req.body.lName
          }
        })
            .end(function(err, response) {
              if(response.statusCode == 200)
                {
                    res.sendFile(__dirname+"/success.html");
                }
                else{
                    res.sendFile(__dirname+"/failure.html");
                }
          });
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running .")
})

//API Key
//81b0b1c93137bef8426dd39064e4f4fe-us14
//Audience Id
//b35fb817a2