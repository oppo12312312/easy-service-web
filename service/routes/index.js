/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 17:53:32
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-15 17:37:47
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const expressWs = require('express-ws');
const service = require('../controller/index');
const websockt = require('../controller/websockt');
const upload = multer({ dest: 'dist/' });
expressWs(router);

router.post('/service/upload', upload.any(), service.upload);

router.post('/service/creatProject', service.creatProject);

router.get('/service/getAllProject', service.getAllProject);

router.post('/service/getVersion', service.getVersion);

router.post('/service/deleteProject', service.deleteProject);

router.post('/service/deleteVersion', service.deleteVersion);

router.ws('/service/massage', websockt.massage);


module.exports = router;
