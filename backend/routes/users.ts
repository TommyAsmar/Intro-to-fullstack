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
  const domain = (req.query.domain as string) || '';

  let baseQuery = 'SELECT * FROM users';
  let countQuery = 'SELECT COUNT(*) as count FROM users';
  const params: any[] = [];

  if (domain) {
    baseQuery += ' WHERE email LIKE ?';
    countQuery += ' WHERE email LIKE ?';
    params.push(`%${domain}`);
  }

  baseQuery += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rows] = await db.query(baseQuery, params);
  const [countRows] = await db.query(countQuery, domain ? [`%${domain}`] : []);
  const total = (countRows as any)[0].count;

  res.json({
    data: rows,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  });
});

usersRouter.get('/:id/projects', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM projects WHERE userId = ?', [req.params.id]
  );
  res.json(rows);
});

export default usersRouter;