'use strict';

const { File, Project } = require('../models');
const { isValidObjectId } = require('mongoose');
const storage = require('../config/storage');
const fs = require('fs');
const path = require('path');

module.exports = {
  async store(req, res){
    const { projectId } = req.params;

    if(!isValidObjectId(projectId)){
      return res.status(400).json({
        message: 'O id do projeto passada na URL é inválida'
      });
    }

    const projectExists = await Project.findOne({_id : projectId});

    if(!projectExists){
      return res.status(400).json({
        message: 'Não existe um projeto com id informado'
      });
    }

    try{

      const files = req.body;
      const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);

      for(let file of files){
        const { base64, fileName, fileType } = file;

        const filePath = path.join(__dirname, `../TEMP/${fileType}-${fileName}`);

        fs.writeFile(filePath, base64, { encoding: 'base64' }, () => {});

        await bucket.upload(filePath, {
          gzip: true,
          metadata: {
            cacheControl: 'no-cache'
          },
          public: true,
          destination: `projectFiles/${projectId}/${fileType}-${fileName}`
        });

        fs.unlink(filePath,() => {});

        //eslint-disable-next-line
        console.log(filePath);

      }

      //eslint-disable-next-line
      console.log('saiu do for');

      const allFiles = files.map(value => {
        return {
          projectId: projectId,
          fileName: value.fileName,
          fileType: value.fileType,
        };
      });
      //eslint-disable-next-line
            console.log('saiu do map');
      const projectFiles = await File.insertMany(allFiles);
      //eslint-disable-next-line
            console.log('inseriu no mongo');
      return res.status(200).json({
        ...projectFiles
      });
    }catch(error){
      //eslint-disable-next-line
      console.log(error);
      return res.status(500).json({
        message: 'Erro ao importar o arquivo'
      });
    }
  }
};
