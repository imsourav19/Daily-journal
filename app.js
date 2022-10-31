
const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey there!! Welcome to Daily Journal. it is a free web app where you can keep daily memory of all the fun & work you did in your entire day😃. Don't worry about your personal info getting leaked, your privacy is always our topmost concern.";
// const aboutContent = "I'm Sourav Gupta(or call me Savvy). Studies in Jorhat Engineering College. Interested in coding and cooking";
// const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const journal = [];

app.get("/", (req, res)=>{res.render("home", {HomeInfo: homeStartingContent, newJournalItems: journal});})
app.get("/about", (req, res)=>{res.render("about");})
app.get("/contact", (req, res)=>{res.render("contact");})
app.get("/compose", (req, res)=>{res.render("compose");})


app.post("/compose", (req, res)=>{
    const post = {
        title: req.body.PostTitle,
        desc: req.body.PostDesc
    };
    journal.push(post);
    res.redirect("/");
})

app.get("/posts/:new", (req,res)=>{
    const reqestedTitle = _.lowerCase(req.params.new);
    journal.forEach((e)=>{
        const storedTitle = _.lowerCase(e.title);
        if(reqestedTitle === storedTitle){
            res.render("post", {Title: e.title, Content: e.desc})
        }
    })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
