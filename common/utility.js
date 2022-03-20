const fs = require('fs');
const request = require('request');
const lodash = require('lodash');
module.exports = {
    isEmpty: (data, ignoreZero = 0) => {
        const dataType = typeof data;
        let response = 0;
        if(data === undefined || data === null) {
            return 1;
        }
        switch (dataType) {
            case 'string':
                data = data.trim();
                if(data === '') {
                    response = 1;
                }
                if(ignoreZero === 0 && (data === '0' || data === '0.0') || data === '0.00') {
                    response = 1;
                }
                break;
            case 'object':
                if(Object.values(data).length === 0) {
                    response = 1;
                }
                break;
            case 'number':
                if(ignoreZero === 0 && (data === 0 || data === 0.00 || isNaN(data))) {
                    response = 1;
                }
                break;
            case 'boolean':
                response = data === true ? 0: 1;
                break;
            case 'NAN':
                response = 0;
                break;
            default:
                response = lodash.isEmpty(data) ? 1 : 0;
                break;
        }
    },
    elapsedTime: (start, end, inSeconds = false) => {
        start = start || new Date().getTime();
        start = (start instanceof Date) ? start.getTime() : start;
        end = end || new Date().getTime();
        const diff = (end - start);
        let elapsedTime = lodash.round(diff, 2);
        if(inSeconds) {
            elapsedTime = (diff === 0) ? 0 : diff/1000;
        }
        elapsedTime = lodash.round(elapsedTime, 2);
        return elapsedTime;
    },
    deleteFile: (path) => {
        if(fs.existsSync(path)) {
            fs.unlink(path, (err) => {
                if(err) throw new Error(err);
            })
        }
    },
    curl: async (url, method = 'get', data, headers, postType = 'json') => {
        try {
            return new Promise((resolve, reject) => {
                const options = {
                    rejectUnauthorized: false,
                    uri: url,
                    method: method.toUpperCase(),
                    json: true
                };
                if(options.method == 'POST') {
                    if(!module.exports.isEmpty(data)) {
                        if(postType == 'json') {
                            options.body = data;
                        } else {
                            if(postType == 'form-data') {
                                options.formData = data;
                            } else {
                                options.form = data;
                            }
                        }
                    }
                    if(postType.toLowerCase() == 'json') {
                        if(module.exports.isEmpty(headers)) {
                            headers = {
                                'Content-Type': 'application/json'
                            };
                        } else {
                            headers['Content-Type'] = 'application/json';
                        }
                    }
                }
                options.headers = headers;
                const start = new Date().getTime();
                request(options, (error, response, body) => {
                    const output = {
                        elapsedTime: module.exports.elapsedTime(start, '', true),
                        httpStatusCode: (response) ? response.statusCode : '',
                        response: (response) ? response.body : '',
                        headers: (response) ? response.headers : ''
                    };
                    if(error) {
                        console.log(error);
                        reject(error);
                    } else {
                        return resolve(output);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }
};