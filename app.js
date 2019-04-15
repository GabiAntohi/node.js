var express = require("express"); // call the express module which is default provded by Node
var app = express();
//call the sql middleware to action
var mysql = require('mysql');
app.set("view engine", "ejs");//set default view engine
var fs = require ('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var contact2 = require("./model/contact2.json"); //this declares the content of the contact.json file as a variable called contact
//access to views/script/images/js folder
app.use(express.static("views"));
app.use(express.static("script"));
app.use(express.static("images"));
app.use(express.static("js"));

//create connectivity to mysql database - this should be in a server connection file
//substitute these details for your own gearhost database details
const db = mysql.createConnection ({

});
db.connect((err)=>{
    if(err){
    console.log("The Connection Failed")
    }
    else{
        console.log("yes, we have takeoff");
    }
});

app.get('/contact', function(req, res) {
res.render("contact");
});

app.get('/about', function(req, res) {
res.render("about");
});
app.get('/contacts', function(req, res) {
res.render("contacts", {contact2});
});
//sql data start here
//create route to create a database table 
//app.get('/createtable', function (req,res){
 // let sql = 'CREATE TABLE Products (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Description varchar(500));'  
 // let query = db.query(sql, (err, res) =>{
    //  if(err) throw err;
 // });
 // res.send("hello from SQL")
//});
//route to create product by hardcode
app.get('/createproduct', function (req,res){
  let sql = 'INSERT INTO Products (Name, Price, Image, Description) VALUES ("Basic Package", 500, "basic.jpg", "Home visit, sketches, colour palettes and followup")'  
  let query = db.query(sql, (err, res) =>{
      if(err) throw err;
  });
  res.send("Product updated")
});
//route to show all products 
app.get('/', function (req,res){
  let sql = 'SELECT * FROM Products'  
  let query = db.query(sql, (err, res1) =>{
      if(err) throw err;
      res.render('index', {res1})
  });
});
app.get('/deleteproduct/:id', function (req,res){
  let sql = 'DELETE FROM Products WHERE Id = '+req.params.id+'';  
  let query = db.query(sql, (err, res1) =>{
      if(err) throw err;
      
  });
  res.redirect('/')
});
//route to render createproduct page - go to url to create new product
app.get('/createproducts', function (req,res){
res.render('createproducts')
});
//route to post new product -- post...from the form
app.post('/createproducts', function (req,res){
  let sql = 'INSERT INTO Products (Name, Price, Image, Description) VALUES ("'+req.body.name+'", '+req.body.price+', "'+req.body.image+'", "'+req.body.description+'")'  
  let query = db.query(sql, (err, res) =>{
      if(err) throw err;
  });
  res.redirect("/")
});
//route to edit sql data
app.get('/editproducts/:id', function (req,res){
let sql = 'SELECT * FROM Products WHERE Id = "'+req.params.id+'"'
let query = db.query(sql, (err, res1)=>{
    if (err) throw err;
    res.render('editproducts', {res1});
});
});
//post request url to edit products
app.post('/editproducts/:id', function(req, res) {
  let sql = 'UPDATE Products SET Name = "'+req.body.name+'", Price = '+req.body.price+', Image= "'+req.body.image+'", Description = "'+req.body.description+'"WHERE Id = "'+req.params.id+'"';  
  let query = db.query(sql, (err, res) =>{
  if(err) throw err;
  });
res.redirect("/") 
});
//route to show individual product page
app.get('/showproduct/:id', function (req,res){
  let sql = 'SELECT * FROM Products WHERE Id = "'+req.params.id+'"'  
  let query = db.query(sql, (err, res1) =>{
      if(err) throw err;
      res.render('showproduct', {res1})
  });
});
//second table here
//create route to create a database table 
//app.get('/createtable', function (req,res){
// let sql = 'CREATE TABLE Gallery (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Image varchar(255), Description varchar(500));'  
//  let query = db.query(sql, (err, res) =>{
//      if(err) throw err;
//  });
//  res.send("hello from SQL second table")
//});
//route to create gallery by hardcode
app.get('/creategallery', function (req,res){
  let sql = 'INSERT INTO Gallery (Name, Image, Description) VALUES ("Basic Package", "basic.jpg", "Home visit, sketches, colour palettes and followup")'  
  let query = db.query(sql, (err, res) =>{
      if(err) throw err;
  });
  res.send("Gallery updated")
});
//route to show all gallery items 
app.get('/gallery', function (req,res){
  let sql = 'SELECT * FROM Gallery'  
  let query = db.query(sql, (err, res1) =>{
      if(err) throw err;
      res.render('gallery', {res1})
  });
});
//route to post new gallery item -- post...from the form
app.post('/gallery', function (req,res){
  let sql = 'INSERT INTO Gallery (Name, Image, Description) VALUES ("'+req.body.name+'", "'+req.body.image+'", "'+req.body.description+'")';  
  let query = db.query(sql, (err, res) =>{
      if(err) throw err;
  });
  res.redirect("gallery")
});
//route to edit sql data
app.get('/editgallery/:id', function (req,res){
let sql = 'SELECT * FROM Gallery WHERE Id = "'+req.params.id+'"'
let query = db.query(sql, (err, res1)=>{
    if (err) throw err;
    res.render('editgallery', {res1});
});
});
//post request url to edit galleryitem
app.post('/editgallery/:id', function(req, res) {
  let sql = 'UPDATE Gallery SET Name = "'+req.body.name+'", Image= "'+req.body.image+'", Description = "'+req.body.description+'"WHERE Id = "'+req.params.id+'"';  
  let query = db.query(sql, (err, res) =>{
  if(err) throw err;
  });
res.redirect("/gallery") 
});
app.get('/deletegallery/:id', function (req,res){
  let sql = 'DELETE FROM Gallery WHERE Id = '+req.params.id+'';  
  let query = db.query(sql, (err, res1) =>{
      if(err) throw err;
      
  });
  res.redirect('/gallery')
});

//sql data end here


app.post('/contact', function(req, res){
    //max id in json file
    function getMax(contact2, id){
        var max;
        for (var i = 0; i<contact2.length; i++){
            if(!max||parseInt(contact2[i][id])>parseInt(max[id]))
            max=contact2[i];
        }
        return max;
    }
    
    //call the getMax function and pass some info
    //when the function runs we need to get function back and store as variable
   
    var maxId = getMax(contact2, "id")
    var newId = maxId.id + 1;
    console.log("new id is " + newId);
    var json = JSON.stringify(contact2);//tell the application to get json ready to modify it
    //create new json object
    var newContact = {
        name: req.body.name,
        surname: req.body.surname,
        comment: req.body.comment,
        id: newId,
        email:req.body.email
    }
    //now we push the data back to the JSON file
    fs.readFile('./model/contact2.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err)
        }else{
           contact2.push(newContact) //add the new contact to the json file
            json = JSON.stringify(contact2, null, 4)// structured
            fs.writeFile('./model/contact2.json', json, 'utf8');
        }
    })
    res.redirect('/contact')
});

//delete contact
app.get('/deletecontact/:id', function(req, res) {
      var json = JSON.stringify(contact2);
      //get the id we want to delete from the URL parameter
      var keyToFind = parseInt(req.params.id);
      console.log(json)
      var data = contact2 //declare the JSON file as variable called data
      //map the data and ind the info we need
      var index = data.map(function(contact2){return contact2.id;}).indexOf(keyToFind)
  
      //js allows to splice JSON data
      contact2.splice(index, 1);//delete only one item from the position of the index variable above
      json = JSON.stringify(contact2, null, 4)// structured
      fs.writeFile('./model/contact2.json', json, 'utf8');
      res.redirect('/contacts')
});

//edit contact
app.get('/editcontact/:id', function(req, res) {
    function chooseContact(individualOne){
        return individualOne.id === parseInt(req.params.id)
        
    }
    var individualOne = contact2.filter(chooseContact)
    res.render("editcontact", {res:individualOne});
});

app.post('/editcontact/:id', function(req, res) {
    var json = JSON.stringify(contact2)
     //find the data we need to edit
      var keyToFind = parseInt(req.params.id);
      var data = contact2; //declare the JSON file as variable called data
      //map the data and ind the info we need
      var index = data.map(function(contact2){return contact2.id;}).indexOf(keyToFind);
      contact2.splice(index, 1, {
          surname:req.body.surname,
          name :req.body.name,
          comment:req.body.comment,
          id:parseInt(req.params.id),
          email:req.body.email
      });
      json = JSON.stringify(contact2, null, 5);
      fs.writeFile('./model/contact2.json', json, 'utf8');
      res.redirect("/contacts"); 
});

// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
});
