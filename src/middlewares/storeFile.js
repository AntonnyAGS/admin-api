const { FileType } = require('../enums');

module.exports = (req, res, next) => {
  const projectFiles = req.body;

  if(!Object.keys(projectFiles).length || !projectFiles.length){
    return res.status(400).json({
      message: 'Por favor, informe o corpo da requisição'
    });
  }

  const validateField = (acc, curr, field) => acc ? !!curr[field] : acc;

  const hasBase64 = projectFiles.reduce((acc, curr) => validateField(acc, curr, 'base64'), true);

  if(!hasBase64){
    return res.status(400).json({
      message: 'A serialização(Base64) do arquivo não foi informado'
    });
  }

  const hasFileName = projectFiles.reduce((acc, curr) => validateField(acc, curr, 'fileName'), true);

  if(!hasFileName){
    return res.status(400).json({
      message: 'O nome do arquivo não foi informado'
    });
  }

  const hasFileType = projectFiles.reduce((acc, curr) => validateField(acc, curr, 'fileType'), true);

  if(!hasFileType){
    return res.status(400).json({
      message: 'O tipo do arquivo não foi informado'
    });
  }

  const isFileTypeMatch = projectFiles.reduce((acc, curr) => {
    return acc ? Object.keys(FileType).includes(curr.fileType) : acc;
  }, true);

  if(!isFileTypeMatch){
    return res.status(400).json({
      message: 'É necessário informar qual é o tipo do arquivo'
    });
  }

  next();
};
