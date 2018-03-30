'use strict';

import * as sys from 'child_process';
var multer  = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/assets/teamLogo/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({storage: storage}).single('teamLogo');

export function uploadFile(req, res) {
  return new Promise(function (resolve, reject) {
    upload(req, res, function (err) {
      if (err) {
        reject(err);
      }
      else{
        resolve('file uploaded');
      }
    });
  });
}

export function getTeamLogos() {
  return new Promise((resolve, reject) => {
    sys.exec('ls client/assets/teamLogo/',
      function (err, itog1) {
        if (err) {
          return reject(err);
        } else {
          let arrFiles = itog1.split('\n');
          arrFiles.pop();
          return resolve(arrFiles);
        }
      });
  })
}