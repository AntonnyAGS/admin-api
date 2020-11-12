'use strict';

/** const Mail = use('Mail');*/
const { User } = require('../models');

class ForgotPasswordController {
  async forgot({req, res}){
    try{
      const email = req.input('email');

      const userExists = await User.findOne({ email });
      if (!userExists){
          return res.status(400).json({
          message: 'Desculpe, não existe o registro desse e-mail.'
          });
      }
      
      /**Gerar um token. */
      /**Enviar email. */
    }
    catch{
      // eslint-disable-next-line
      console.log('Error on check user =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível o envio de email para recuperação de senha.'
      });
    }
  }
}

module.exports = ForgotPasswordController;