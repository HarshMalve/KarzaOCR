
const fs = require('fs');
const utility = require('../common/utility');
const KARZA_HEADER = {
    "x-karza-key": process.env.KARZA_KEY
}
module.exports = {
    getKarzaToken: async (req, res, next) => {
        try {
            let apiRes = {};
            const URL = process.env.KARZA_TOKEN_GENERATE_URL;
            const method = 'POST';
            const dataArr = {
                "productId": ["liveliness"]
            };
            const responseArr = await utility.curl(URL, method, dataArr, KARZA_HEADER, 'form-data');
            let tokenRes = responseArr.response;
            if(!utility.isEmpty(tokenRes) && !utility.isEmpty(tokenRes.result) && !utility.isEmpty(tokenRes.result.success == true)) {
                apiRes = {
                    karzaToken: tokenRes.result.data.karzaToken,
                    success: tokenRes.result.success
                };
                res.status(200).json(apiRes);
            } else {
                apiRes = {
                    karzaToken: null,
                    success: false
                };
                res.status(400).json(apiRes);
            }
        } catch (error) {
            res.status(500).json({success: false});
            throw error;
        }
    },
    karzaOCR: async (req, res, next) => {
        try {
            const apiRes = {};
            const URL = process.env.KARZA_OCR_API_URL;
            const method = 'POST';
            const dataArr = {...req.body, file: fs.createReadStream(req.files.file['newPath'])};
            const responseArr = await utility.curl(URL, method, dataArr, KARZA_HEADER, 'form-data');
            const response = responseArr.response;
            if (responseArr.httpStatusCode === 200 && (!utility.isEmpty(response) && response.statusCode)) {
                const result = !utility.isEmpty(response.result) ? response.result[0] : '';
                apiRes['details'] = result.details;
                apiRes['type'] = !utility.isEmpty(result.type) ? result.type : '';
                apiRes['karzaResponseInSec'] = `${responseArr.elapsedTime} seconds`;
                res.status(200).json(apiRes);
            }
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
            throw error;
        }
    }
};