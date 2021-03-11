const express = require("express");
const morgan = require("morgan");

const app = express();
const host = "localhost";
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.redirect('/GeoQuizzer');
});

app.get('/GeoQuizzer', (req, res) => {
  res.render('map');
});

app.get('/GeoQuizzer/:countryName', (req, res) => {
  res.render('quiz');
});

app.listen(port, host, () => {
  console.log(`GeoQuizzer is listening on port ${port}...`);
})