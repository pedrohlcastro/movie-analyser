'use strict';

const PORT =  ( process.env.PORT || 8000 );
const ENV = process.env.NODE_ENV || 'dev';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import fileUploader from 'express-fileupload';
import compress from 'shrink-ray';
import helmet from 'helmet';
import cheerio from 'cheerio';
import https from 'https';

import request from 'request';

import configEnv from './config/envConfig';
import WatsonController from './controllers/WatsonController';

const app = express();

//config gzip compress
if (ENV != 'test'){
    app.use(compress({
        cache: (req, res) => {
            return true;
        },
        brotli: {
            quality: 6
        },
        zlib: {
            quality: 6
        }
    }));
}
app.use(morgan(ENV));
app.use(cors());

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUploader());

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/')));

//API routes goes here
app.post('/api/getWatsonData', (req, res, next) => {
    const url = req.body.url.replace('http://', 'https://');
    console.log(url);
    const params = {
        url: url,
        qs: {
          'api-key': "b098e9cc7cd14820bbeac644c6b2bb66"
        },
    };
    request.get(params, (err, response, body) => {
        if(err) {
            res.status(500).json({result: err});
        }
        let $ = cheerio.load(body);
        let result = [];
        let p = $('#articleBody').text();
        if(!p){
            p = $('.story-body').text();
        }
        WatsonController.execute(p)
            .then((data) => {
                res.json(data.document_tone.tones);
            })
            .catch((err) => {
                next(err);
            });
    });
});

//Call Angular
app.all('*', (req, res) => {
    //res.json({result: 'OK'});
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//manage config per environment
configEnv(app, mongoose, morgan);

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log('[BackEnd] -> http://localhost:' + PORT);
});

export default app;