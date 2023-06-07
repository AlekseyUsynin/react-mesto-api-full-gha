require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
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

app.use(cors({
  origin: ['http://localhost:3001',
    'http://localhost:3000',
    'http://mesto-usynin.nomoredomains.rocks',
    'https://mesto-usynin.nomoredomains.rocks',
    'http://api.mesto-usynin.nomoredomains.rocks',
    'https://api.mesto-usynin.nomoredomains.rocks',
  ],
  credentials: true,
  preflightContinue: false,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  optionsSuccessStatus: 204,
}));

app.use(cookieParser());
app.use(requestLogger);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

app.use(errorLogger);
app.use(errors());

app.use(errorCenter);

app.listen(PORT);
