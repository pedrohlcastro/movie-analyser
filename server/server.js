'use strict';

const PORT =  ( process.env.PORT || 8000 );
const ENV = process.env.NODE_ENV || 'dev';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

import configEnv from './config/envConfig';
import ApiController from './controllers/ApiController'


const app = express();

app.use(morgan(ENV));
app.use(cors());

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/')));

//API routes goes here
app.use('/api', ApiController);

//Call Angular
app.all('*', (req, res) => {
    //res.json({result: 'OK'});
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//manage config per environment
configEnv(app);

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log('[BackEnd] -> http://localhost:' + PORT);
});

export default app;
