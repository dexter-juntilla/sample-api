import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});