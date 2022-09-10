import { Express } from 'express';
import { createUser } from '../controllers/user/createUser';

export default (app: Express, db: DatabaseInterface) => {
  app.post('/users', createUser({ db }));
};
