import { Request, Response } from 'express';

export const createUser =
  (args: { db: DatabaseInterface }) =>
  async (request: Request, response: Response) => {
    try {
      const { db } = args;

      const user = await db.create('users', request.body);

      return response.status(201).json(user);
    } catch (e) {
      return response.status(500).send(e);
    }
  };
