import 'dotenv/config'
import path from 'path';
import express from 'express';
import usersRouter from './routes/messagesRouter';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(process.env.PORT);
