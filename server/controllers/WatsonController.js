'use strict';

import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';
import config from '../../config.json';

class WatsonController{
    constructor(){
        this._tone_analyzer = new ToneAnalyzerV3({
            username: config.watsonUsername,
            password: config.watsonPassword,
            version_date: '2017-09-21'
        });
    }

    execute(inputText){
        const params = {
            text: inputText,
            content_type: 'text/plain'
        };
        return new Promise((resolve, reject) => {
            this._tone_analyzer.tone(params, (error, response) => {
                if (error)
                  reject({err: error, msg: 'Internal Error - Watson', status: 500})
                else
                  resolve(response);
            });
        })

    }
}

export default new WatsonController;
