const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
// port environment or local port
const port = process.env.PORT || 8000;

// public folder path
const public_path = path.join(__dirname, "../public");
app.use(express.static(public_path));


// views folder path
const template_path = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", template_path);

// partials folder path
const partials_Path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_Path);

const aboutPage = path.join(__dirname, "../public/about.html")

// routing
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/weather", (req, res) => {
    res.render("weather");
});
app.get("*", (req, res) => {
    res.render("error")
});




app.listen(port, () => {
    console.log("Server is live now!!!");
});