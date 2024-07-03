import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import favicon from 'serve-favicon';
import config from '@config/config';
import routes from '@routes/index.route';
import path from 'path';

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

app.use('/api/', routes);

// serve static files
const publicPath = path.join(__dirname, '../../public');
app.use(express.static(publicPath));
app.use(favicon(path.join(publicPath, 'favicon.ico')));

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = createError(status.NOT_FOUND, 'Page Not Found');
    return next(err);
});


// error handler, send stacktrace only during development
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // customize Joi validation errors
    if (err.isJoi) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.message = err.details.map((e: any) => e.message).join('; ');
        err.status = status.BAD_REQUEST;
    }

    res.status(err.status || status.INTERNAL_SERVER_ERROR).json({
        message: err.message,
    });
    next(err);
});

export default app;
