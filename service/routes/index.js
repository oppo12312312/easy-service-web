/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 17:53:32
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-09 21:52:58
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const service = require('../controller/index');

const upload = multer({ dest: 'dist/' });

router.post('/service/upload', upload.any(), service.upload);

router.post('/service/creatProject', service.creatProject);

router.get('/service/getAllProject', service.getAllProject);

router.post('/service/getVersion', service.getVersion);

module.exports = router;
