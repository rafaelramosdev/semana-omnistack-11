import { Request, Response } from 'express'

import db from '../database/connection';

import { generateUniqueId } from '../utils/generateUniqueId';

export default {
  async index(request: Request, response: Response) {
    const ongs = await db('ongs').select('ongs.*');

    return response.send(ongs);
  },

  async showIncidents (request: Request, response: Response) {
    const ong_id = request.headers.authorization;
        
    const incidents = await db('incidents').where('ong_id', ong_id).select('incidents.*');
    
    return response.send(incidents);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf
    } = request.body;

    const id = generateUniqueId();

    const trx = await db.transaction();

    try {
      await trx('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });

      await trx.commit();
    
      return response.status(201).send({ id });
    } catch (err) {
      console.log(err);

      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}