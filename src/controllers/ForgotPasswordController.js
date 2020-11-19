'use strict';

/** const Mail = use('Mail');*/
const { User } = require('../models');
const sendMail = require('../config/nodemailer');
const forgotPassword = require('../templates/forgot-password');

module.exports = {
  async forgot(req, res){
    try{
      const { email } = req.body;

      const userExists = await User.findOne({ email });
      if (!userExists){
        return res.status(400).json({
          message: 'Desculpe, não existe o registro desse e-mail.'
        });
      }

      const message = {
        from: `Admin Fábrica <${process.env.EMAIL_USER}>`,
        to: userExists.email,
        subject: 'Esqueceu a senha',
        html: forgotPassword(userExists.name, 'wwww.google.com')
      };

      await sendMail(message);
      return res.status(200).json({ message: 'Enviado com sucesso'});

      /**Gerar um token. */
      /**Enviar email. */
    } catch(error) {
      // eslint-disable-next-line
      console.log('Error on check user =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível o envio de email para recuperação de senha.'
      });
    }
  }
};
