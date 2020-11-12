'use strict';

const { request } = require('http');
/** const Mail = use('Mail');*/
const { User } = require('../models');

class ResetPasswordController {
    async store({ req }) {
        const { token, password} = request.only([
            'token',
            'password',
        ]);

        /**Verificar como sera associação do token, junto ao usuario? */
        /**Resgatar o usuário associado via token? */

        const user = await token.user().fetch();

        user.password = password

        /**Provavelmente precisa criar um save(), porem ver se sera criado um geral ou um especifico para salvar nova senha. */
        await user.save();

    }
}

module.exports = ResetPasswordController