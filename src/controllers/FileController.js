'use strict';

const { File, Project } = require('../models');
const { isValidObjectId } = require('mongoose');
const storage = require('../config/storage');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  async store(req, res){
    try{
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

      const files = req.body;
      const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);

      for(let file of files){
        const { base64, fileName, fileType } = file;

        const tag = crypto.createHash('md5').update(projectId+fileType+fileName).digest('hex');

        const fileExists = await File.find({tag}).select('+tag');
        let isUpdated = false;

        if(fileExists.length){
          isUpdated = true;
        }

        const filePath = path.join(__dirname, `../TEMP/${fileType}-${fileName}`);

        fs.writeFile(filePath, base64, { encoding: 'base64' }, () => {
          bucket.upload(filePath, {
            gzip: true,
            metadata: {
              cacheControl: 'no-cache'
            },
            public: true,
            destination: `projectFiles/${projectId}/${fileType}-${fileName}`
          }, () => {
            fs.unlink(filePath,() => {});
          });
        });

        files[files.indexOf(file)].tag = tag;
        files[files.indexOf(file)].isUpdated = isUpdated;

      }

      const updatedAt = new Date().toISOString();

      const allNewFiles = files.filter(value => !value.isUpdated).map(value => {
        return {
          projectId: projectId,
          fileName: value.fileName,
          fileType: value.fileType,
          tag: value.tag
        };
      });

      const updatedFilesTags = files.filter(value => value.isUpdated).map(value => value.tag);

      const projectFiles = [];

      if(allNewFiles.length){
        projectFiles.push(...(await File.insertMany(allNewFiles)));
      }

      if(updatedFilesTags.length){
        const queryUpdate = {
          tag: {
            $in: updatedFilesTags
          }
        };

        await File.updateMany(queryUpdate, { updatedAt });

        const storedFiles = await File.find(queryUpdate);
        projectFiles.push(...storedFiles);

      }

      return res.status(201).json(projectFiles);
    }catch(error){
      //eslint-disable-next-line
      console.log(error);
      return res.status(500).json({
        message: 'Erro ao importar o arquivo'
      });
    }
  },
  async showByProjectId(req, res){
    try {
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

      const projectFiles = await File.find({projectId});
      if(projectFiles.length === 0){
        return res.status(400).json({
          message: 'Não existem arquivos para o projeto informado'
        });
      }

      const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);

      const files = projectFiles.map(file => {
        const storageFile = bucket.file(`projectFiles/${projectId}/${file.fileType}-${file.fileName}`);
        return {
          _id: file._id,
          projectId: file.projectId,
          fileName: file.fileName,
          fileType: file.fileType,
          fileUrl: `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET}/${storageFile.name}`,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
          updatedFile: file.updatedFile
        };
      });

      return res.status(200).json(files);
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      return res.status(500).json({
        message: 'Erro ao listar arquivos'
      });

    }
  },
  async index(req,res){
    try {
      const query = req.query;

      const projectFiles = await File.find(query);

      const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);

      const files = projectFiles.map(file => {
        const storageFile = bucket.file(`projectFiles/${file.projectId}/${file.fileType}-${file.fileName}`);
        return {
          _id: file._id,
          projectId: file.projectId,
          fileName: file.fileName,
          fileType: file.fileType,
          fileUrl: `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET}/${storageFile.name}`,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
          updatedFile: file.updatedFile
        };
      });

      return res.status(200).json(files);
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      return res.status(500).json({
        message: 'Erro ao listar arquivos'
      });

    }
  }
};
