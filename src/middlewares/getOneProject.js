'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id){
    return res.status(400).json({ message: 'Para detalhar um projeto é preciso de um id.' });
  }
  next();
};
