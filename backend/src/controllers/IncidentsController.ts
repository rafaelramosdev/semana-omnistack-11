import { Request, Response } from 'express'

import db from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const { page = 1 } = request.query;  // PAGINATION

    const [count] = await db('incidents').count();               //X-TOTAL-COUNT

    const incidents = await db('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)                          // PAGINATION
      .offset((Number(page) - 1) * 5)    // PAGINATION
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);           

    response.header('X-Total-Count', String(count['count(*)'])); //X-TOTAL-COUNT

    return response.send(incidents);
  },

  async create(request: Request, response: Response) {
    const {
      title,
      description,
      value,
    } = request.body;

    const ong_id = request.headers.authorization;

    const trx = await db.transaction();

    try {
      const insertedIncidentsIds = await trx('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });

      const incident_id = insertedIncidentsIds[0];

      await trx.commit();

      return response.status(201).send({ id: incident_id });
    } catch (err) {
      console.log(err);

      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const ong_id = request.headers.authorization;

    const trx = await db.transaction();

    try {
      const incident = await trx('incidents')
      .where('id', Number(id))
      .select('ong_id')
      .first();

      if (incident.ong_id !== ong_id) 
        return response.status(401).send({ error: 'Operation not permitted.' })

      await trx('incidents').where('id', id).delete();

      await trx.commit();

      return response.status(204).send();
    } catch (err) {
      console.log(err);

      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}