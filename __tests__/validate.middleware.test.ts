import request from 'supertest';
import express from 'express';
import Joi from 'joi';
import validateRequest from '../src/middleware/validate.middleware '; 

const app = express();
app.use(express.json());

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
});

app.post('/test', validateRequest(schema), (req, res) => {
  res.status(200).json({ message: 'Valid request' });
});

describe('validateRequest middleware', () => {
  it('should return 200 for a valid request', async () => {
    const response = await request(app)
      .post('/test')
      .send({ name: 'John', age: 30 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Valid request');
  });

  it('should return 400 for an invalid request', async () => {
    const response = await request(app)
      .post('/test')
      .send({ name: 'John' }); 

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('"age" is required');
  });

  it('should return 500 for an unexpected error', async () => {
    const appWithError = express();
    appWithError.use(express.json());

    const faultySchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });

    jest.spyOn(faultySchema, 'validateAsync').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    appWithError.post('/test', validateRequest(faultySchema), (req, res) => {
      res.status(200).json({ message: 'Valid request' });
    });

    const response = await request(appWithError)
      .post('/test')
      .send({ name: 'John', age: 30 });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Unexpected error');
  });
});
