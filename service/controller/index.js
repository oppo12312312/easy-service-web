/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 18:21:19
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-07-08 18:20:27
 */
const fs = require('fs');
// const unzip = require('unzip');
const AdmZip = require('adm-zip');
const unzipFile = './upload/unzip/';
const zipFile = './upload/zip/';
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

const service = {
  upload: (req, res) => {
    const desFile = `${zipFile}/${req.body.name}/${req.files[0].originalname}`;
    const unzipFileStr = `${unzipFile}/${req.body.name}/`;
    fs.readFile(req.files[0].path, (err, data) => {
      fs.writeFile(desFile, data, (err) => {
        const unzip = new AdmZip(desFile);  
        unzip.extractAllTo(unzipFileStr, /*overwrite*/true);
        if (err) {
          console.log(err);
        } else {
          const response = {
            state: '1',
            filename: req.files[0].originalname
          };
          res.end(JSON.stringify(response));
        }
      });
    });
  },
  creatProject(req, res) {
    console.log(req.body);
    req.on('data', (data) => { //监听数据过来
      console.log(data);
      let obj = decodeURIComponent(data);
      console.log(obj);
      obj = JSON.parse(data);
      const projectName = obj.projectName;
      console.log(projectName);
      fs.mkdir(unzipFile + projectName, () => {
        fs.mkdir(zipFile + projectName, (error) => {
          if (error) {
            const response = {
              state: '0',
              error
            };
            res.end(JSON.stringify(response));
          }
          const response = {
            state: '1'
          };
          res.end(JSON.stringify(response));
          console.log('创建目录成功');
        });
      });
    });
  },
  getAllProject(req, res) {
    console.log(unzipFile);
    fs.readdir(unzipFile, (error, data) => {
      if (error) {
        console.log(error);
        data = [];
      }
      data = data.filter(item => {
        return item !== '__MACOSX';
      });
      const response = {
        state: '1',
        data
      };
      res.end(JSON.stringify(response));
      console.log(data); //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录  
    });
  },
  getVersion(req, res) {
    req.on('data', (data) => { //监听数据过来
      let obj = decodeURIComponent(data);
      obj = JSON.parse(data);
      const projectName = obj.projectName;
      const fileNameStr = `${unzipFile}/${projectName}`;
      fs.readdir(fileNameStr, (error, data) => {
        if (error) {
          console.log(error);
          return false;
        }
        data = data.filter(item => {
          return item !== '__MACOSX';
        });
        const response = {
          state: '1',
          data
        };
        res.end(JSON.stringify(response));
        console.log(data); //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录  
      });
    });
  },
  deleteProject(req, res) {
    req.on('data', (data) => { //监听数据过来
      let obj = decodeURIComponent(data);
      obj = JSON.parse(data);
      const projectName = obj.projectName;
      const nufileNameStr = `${unzipFile}${projectName}`;
      console.log(nufileNameStr);
      deleteFolderRecursive(nufileNameStr);
      const response = {
        state: '1'
      };
      res.end(JSON.stringify(response));
    });
  },
  deleteVersion(req, res) {
    req.on('data', (data) => { //监听数据过来
      let obj = decodeURIComponent(data);
      obj = JSON.parse(data);
      const projectName = obj.projectName;
      const desionName = obj.desionName;
      const name = `${unzipFile}${projectName}/${desionName}`;
      console.log(name);
      deleteFolderRecursive(name);
      const response = {
        state: '1'
      };
      res.end(JSON.stringify(response));
    });
  }
};

module.exports = service;
