import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

routes(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
