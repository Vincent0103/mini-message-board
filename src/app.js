import 'dotenv/config'
import path from 'path';
import express from 'express';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
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

app.get('/new', (req, res) => {
  res.render('form')
});

app.post('/new', (req, res) => {
  const { authorName, text } = req.body;
  messages.push({ user: authorName, text: text, added: new Date() });
  res.redirect('/');
});

app.get("/message/:authorName", (req, res) => {
  const { authorName } = req.params;
  const message = messages.find((message) => message.user === authorName);

  if (!message) {
    res.send(404).send("Message not found");
    return;
  }

  res.render('message', { ...message });
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages.slice().reverse() });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(process.env.PORT);
