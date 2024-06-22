import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
// import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express';
import config from './config';
import routes from '../routes/index.route';

const app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// app.use('/api/', routes);
app.use('/', routes);


// catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//     const err = createError(404, 'Page Not Found');
//     return next(err);
// });


// error handler, send stacktrace only during development
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // customize Joi validation errors
    if (err.isJoi) {
        err.message = err.details.map((e: any) => e.message).join('; ');
        err.status = 400;
    }

    res.status(err.status || 500).json({
        message: err.message,
    });
    next(err);
});

export default app;
