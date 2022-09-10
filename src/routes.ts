import { Express } from 'express';

import userRoutes from './routes/user';

export default (app: Express) => {
  userRoutes(app);
};
