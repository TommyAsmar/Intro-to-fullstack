import {db} from '../db.js'
import { Router } from 'express';
import cors from 'cors';
import express from 'express';
const app = express();
import path from 'path';
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

  const [rows] = await db.query(
    'SELECT * FROM projects LIMIT ? OFFSET ?',
    [limit, offset]
  );

  res.json(rows);
});

export default projectsRouter;