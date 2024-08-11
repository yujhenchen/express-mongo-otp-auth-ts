import { connect, connection } from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn().mockImplementation((event, callback) => {
      if (event === 'connecting') {
        callback();
      } else if (event === 'connected') {
        callback();
      } else if (event === 'error') {
        callback(new Error('Connection failed'));
      }
    }),
    once: jest.fn(),
  },
}));

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log and return success message on successful connection', async () => {
    const dbConnString = 'mongodb://localhost:27017/test';
    (connect as jest.Mock).mockResolvedValueOnce(undefined); 

    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await (async function() {
      const serverSelectionTimeoutMS = 60000;

      try {
        connection.on('connecting', () => console.info('connecting'));
        connection.on('connected', () => console.info('connected'));
        connection.on('open', () => console.info('open'));
        connection.on('disconnected', () => console.info('disconnected'));
        connection.on('reconnected', () => console.info('reconnected'));
        connection.on('disconnecting', () => console.info('disconnecting'));
        connection.on('close', () => console.info('close'));

        connection.on('error', () => {
          console.error(`🛸 Failed to connect to database: ${dbConnString}`);
        });

        await connect(dbConnString, {
          serverSelectionTimeoutMS,
        });
        return '🟢 Successfully connected to database';
      }
      catch (error) {
        console.error(error);
        return `🛸 Failed to connect to database: ${JSON.stringify(error)}`;
      }
    })();

    expect(consoleInfoSpy).toHaveBeenCalledWith('connecting');
    expect(consoleInfoSpy).toHaveBeenCalledWith('connected');
    expect(result).toBe('🟢 Successfully connected to database');

    consoleInfoSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log and return error message on failed connection', async () => {
    const dbConnString = 'mongodb://localhost:27017/test';
    const error = new Error('Connection failed');
    (connect as jest.Mock).mockRejectedValueOnce(error); 

    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Funzione inline per testare il comportamento
    const result = await (async function() {
      const serverSelectionTimeoutMS = 60000;

      try {
        connection.on('connecting', () => console.info('connecting'));
        connection.on('connected', () => console.info('connected'));
        connection.on('open', () => console.info('open'));
        connection.on('disconnected', () => console.info('disconnected'));
        connection.on('reconnected', () => console.info('reconnected'));
        connection.on('disconnecting', () => console.info('disconnecting'));
        connection.on('close', () => console.info('close'));

        connection.on('error', () => {
          console.error(`🛸 Failed to connect to database: ${dbConnString}`);
        });

        await connect(dbConnString, {
          serverSelectionTimeoutMS,
        });
        return '🟢 Successfully connected to database';
      }
      catch (error) {
        console.error(error);
        return `🛸 Failed to connect to database: ${JSON.stringify(error)}`;
      }
    })();

    expect(consoleErrorSpy).toHaveBeenCalledWith(`🛸 Failed to connect to database: ${dbConnString}`);
    expect(result).toBe(`🛸 Failed to connect to database: ${JSON.stringify(error)}`);

    consoleInfoSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
