import app from './config/express';
import config from 'config/config';

const server = app.listen(config.port, () =>
    console.log(`
  🚀 Server ready at: http://localhost:${config.port} ⭐️`),
);

export default server;
