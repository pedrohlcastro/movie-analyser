'use strict';

import {Router} from 'express';
import cheerio from 'cheerio';
import https from 'https';
import request from 'request';

import WatsonController from './WatsonController';
import keys from '../../config.json';

const router = new Router();

router.post('/getWatsonData', (req, res, next) => {
    const url = req.body.url.replace('http://', 'https://');

    const params = {
        url: url,
        qs: {
          'api-key': keys.nytKey
        },
    };
    request.get(params, (err, response, body) => {
        if(err) {
            next()
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

export default router;
