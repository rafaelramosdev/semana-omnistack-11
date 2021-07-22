import { Request, Response } from 'express'

import db from '../database/connection';

export default {
  async create (request: Request, response: Response) {
    const { id } = request.body;

    const ong = await db('ongs')
      .where('id', String(id))
      .select('name')
      .first();

    if (!ong)
      return response.status(400).send({error: 'No ONG found with this ID.'});

    return response.send(ong);
  } 
}