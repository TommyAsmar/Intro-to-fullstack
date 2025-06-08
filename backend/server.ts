import {db} from './db.js'
import usersRouter from './routes/users.js';
import projectsRouter from './routes/projects.js';
import cors from 'cors';
import express from 'express';
const app = express();
import path from 'path';
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('frontend')));

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('frontend', 'home.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);