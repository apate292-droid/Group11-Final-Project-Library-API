import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import authorRouter from './routes/authorRoutes.js';

import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
