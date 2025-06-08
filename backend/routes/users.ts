import {db} from '../db.js'
import { Router } from 'express';
import cors from 'cors';
import express from 'express';
const app = express();
import path from 'path';
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('frontend')));

const usersRouter = Router();



usersRouter.get('/', (req, res) => {
  res.sendFile(path.resolve('frontend', 'users.html'));
});

usersRouter.get('/api', async (req, res) => {
   const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;
  const [rows] = await db.query('SELECT * FROM users LIMIT ? OFFSET ?', 
    [limit, offset]);

  res.json(rows);
});

usersRouter.get('/:id/projects', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM projects WHERE userId = ?', [req.params.id]
  );
  res.json(rows);
});

export default usersRouter;