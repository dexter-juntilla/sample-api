import { Express } from 'express';
import { createUser } from '../controllers/user/createUser';

export default (app: Express) => {
  app.post('/users', createUser);
};
