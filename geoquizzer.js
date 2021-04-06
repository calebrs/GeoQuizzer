const express = require("express");
const morgan = require("morgan");
const quizzes = require("./lib/quizzes")

const app = express();
const host = "localhost";
const port = 3000;
const CAPITOL_NAMES = ['Ottawa', 'Ulaanbaatar', 'Lima', 'Cape Town', 'Quito', 
                       'Oslo', 'Moscow', 'Dublin', 'Hanoi', 'Minsk', 
                       'Canberra', 'Brussels', 'Kabul', 'Bogota', 'Manila'];
const FLAG_REFS = ['https://flagpedia.net/data/flags/w580/ca.png',
                   'https://flagpedia.net/data/flags/w580/mn.png',
                   'https://flagpedia.net/data/flags/w580/za.png',
                   'https://flagpedia.net/data/flags/w580/pe.png',
                   'https://flagpedia.net/data/flags/w580/co.png',
                   'https://flagpedia.net/data/flags/w580/ro.png',
                   'https://flagpedia.net/data/flags/w580/eg.png',
                   'https://flagpedia.net/data/flags/w580/fi.png',
                   'https://flagpedia.net/data/flags/w580/sd.png',
                   'https://flagpedia.net/data/flags/w580/sr.png',
                   'https://flagpedia.net/data/flags/w580/ie.png',
                   'https://flagpedia.net/data/flags/w580/kw.png',
                   'https://flagpedia.net/data/flags/w580/cu.png',
                   'https://flagpedia.net/data/flags/w580/jo.png',
                   'https://flagpedia.net/data/flags/w580/bs.png'];

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

function getAnswerOptions(array, existingName) {
  let options = [existingName];

  while (options.length <= 3) {
    let randomIndex = Math.floor(Math.random() * array.length);
    if (!options.includes(array[randomIndex])) {
      options.push(array[randomIndex]);
    }
  }

  return shuffle(options);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  let quiz = getQuiz(quizzes, req.params.countryID);

  res.render('question-2', {
    quiz: quiz,
    answers: getAnswerOptions(FLAG_REFS, quiz.flag),
  });
});

app.post('/GeoQuizzer/:countryID/question2', (req, res) => {
  //validation to be written and the logic for if the question is right or wrong
  res.redirect(`/GeoQuizzer/${req.params.countryID}/question3`);
});

app.get('/GeoQuizzer/:countryID/question3', (req, res) => {
  let quiz = getQuiz(quizzes, req.params.countryID);

  res.render('question-3', {
    quiz: quiz,
    answers: getAnswerOptions(CAPITOL_NAMES, quiz.capitol)
  });
});

app.post('/GeoQuizzer/:countryID/question3', (req, res) => {
  //validation to be written and the logic for if the question is right or wrong
  res.redirect('/GeoQuizzer');
});

app.listen(port, host, () => {
  console.log(`GeoQuizzer is listening on port ${port}...`);
})