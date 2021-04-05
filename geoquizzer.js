const express = require("express");
const morgan = require("morgan");
const quizzes = require("./lib/quizzes")

const app = express();
const host = "localhost";
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

function getQuiz(quizzes, quizId) {
  for (let indx = 0; indx < quizzes.length; indx += 1) {
    let quiz = quizzes[indx];
    if (quizId === quiz['id'])
    return quiz;
  }
}

app.get('/', (req, res) => {
  res.redirect('/GeoQuizzer');
});

app.get('/GeoQuizzer', (req, res) => {
  res.render('quizzes', {
    quizzes: quizzes,
  });
});

app.get('/GeoQuizzer/:countryID/question1', (req, res) => {
  res.render('question-1', {
    quiz: getQuiz(quizzes, req.params.countryID),
  });
});

app.post('/GeoQuizzer/:countryID/question1', (req, res) => {
  //validation to be written and the logic for if the question is right or wrong
  res.redirect(`/GeoQuizzer/${req.params.countryID}/question2`);
});

app.get('/GeoQuizzer/:countryID/question2', (req, res) => {
  res.render('question-2', {
    quiz: getQuiz(quizzes, req.params.countryID)
  });
});

app.post('/GeoQuizzer/:countryID/question2', (req, res) => {
  //validation to be written and the logic for if the question is right or wrong
  res.redirect(`/GeoQuizzer/${req.params.countryID}/question3`);
});

app.get('/GeoQuizzer/:countryID/question3', (req, res) => {
  res.render('question-3', {
    quiz: getQuiz(quizzes, req.params.countryID)
  });
});

app.post('/GeoQuizzer/:countryID/question3', (req, res) => {
  //validation to be written and the logic for if the question is right or wrong
  res.redirect('/GeoQuizzer');
});

app.listen(port, host, () => {
  console.log(`GeoQuizzer is listening on port ${port}...`);
})