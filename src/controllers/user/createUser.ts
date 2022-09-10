import { Request, Response } from 'express';

export const createUser = async (request: Request, response: Response) => {
  return response.status(201).json({ id: 1 });
};
