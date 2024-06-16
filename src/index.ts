import connectToDatabase from 'config/mongoose';
import app from './config/express';
import config from 'config/config';

connectToDatabase(config.dbConnString);

const server = app.listen(config.port, () =>
  console.info(`
  🚀 Server ready at: http://localhost:${config.port} ⭐️`),
);

export default server;
