'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id){
    return res.status(400).json({ message: 'O campo id é obrigatório.'});
  }
  if (!req.body.commentText) {
    return res.status(400).json({ message: 'O campo comentário é obrigatório.'});
  }

  next();
};
