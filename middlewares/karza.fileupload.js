'use strict';
const utility = require('../common/utility');
const path = require('path');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}
module.exports = {
    uploadFile: async (req, res, next) => {
        try {
            if(utility.isEmpty(req.files)) {
                res.status(404).json({
                    type: false,
                    message: 'No file uploaded',
                    data: ''
                });
                return 0;
            } else if(!MIME_TYPE_MAP[req.files.file.mimetype]) {
                res.status(406).json({
                    type: false,
                    message: 'File type not supported',
                    data: ''
                });
                return 0;
            } else {
                const file = req.files.file;
                const fileName = file.md5 + new Date().getMilliseconds() + Math.random().toString(36).substr(2,8).toUpperCase() + '.' + MIME_TYPE_MAP[req.files.file.mimetype];
                const uploadPath = path.join(__dirname,`../public/uploads/${fileName}`);
                await file.mv(uploadPath, (err) => {
                    if(err) {
                        res.status(500).json({
                            type: false,
                            message: 'Error saving file',
                            data: ''
                        });
                    } else {
                        req.files.file['newName'] = fileName;
                        req.files.file['newPath'] = uploadPath;
                        next();
                    }
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        }
    }
};