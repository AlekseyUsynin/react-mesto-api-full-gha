const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { loginJoi, createUserJoi } = require('./middlewares/validation');
const errorCenter = require('./middlewares/errorCenter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:3001',
    'http://localhost:3000'],
  credentials: true,
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  optionsSuccessStatus: 204,
}));

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);

app.use(auth);
app.use('/api', userRoutes);
app.use('/api', cardRoutes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

app.use(errorCenter);

app.listen(PORT);
