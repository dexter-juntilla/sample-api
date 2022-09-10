import { Express } from 'express';

import userRoutes from './routes/user';

export default (app: Express, db: DatabaseInterface) => {
  userRoutes(app, db);
};
