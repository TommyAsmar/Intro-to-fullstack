import { db } from '../db.js';
import { Router } from 'express';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('frontend')));

const projectsRouter = Router();

projectsRouter.get('/', async (req, res) => {
  res.sendFile(path.resolve('frontend', 'projects.html'));
});

projectsRouter.get('/api', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;
  const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';

  const [rows] = await db.query(
    `SELECT * FROM projects ORDER BY name ${sort} LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  const [countRows] = await db.query('SELECT COUNT(*) as count FROM projects');
  const total = (countRows as any)[0].count;

  res.json({
    data: rows,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  });
});

projectsRouter.get('/api/user/:userId', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;
  const userId = req.params.userId;
  const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';

  const [rows] = await db.query(
    `SELECT * FROM projects WHERE userId = ? ORDER BY name ${sort} LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );

  const [countRows] = await db.query(
    'SELECT COUNT(*) as count FROM projects WHERE userId = ?',
    [userId]
  );

  const total = (countRows as any)[0].count;

  res.json({
    data: rows,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  });
});

export default projectsRouter;