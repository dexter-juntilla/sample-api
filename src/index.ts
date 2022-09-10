import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import mongo from './lib/database';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT;

(async () => {
  const db: DatabaseInterface = await mongo.operation(
    await mongo.connect(process.env.MONGODB_CLUSTER_URL as string),
  );

  app.use(bodyParser.json());

  routes(app, db);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();
