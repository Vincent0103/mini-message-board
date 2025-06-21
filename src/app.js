import 'dotenv/config'
import path from 'path';
import express from 'express';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date()
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date()
  }
];

const routes = ['', 'new'];

app.get('/new', (req, res) => {
  res.render('form')
});

app.post('/new', (req, res) => {
  const { authorName, text } = req.body;
  messages.push({ user: authorName, text: text, added: new Date() });
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages.slice().reverse() });
});


app.listen(process.env.PORT);
