const sequelize = require('./../../database/sequelize_remote');
const {ContaBancariaFuncionarioModel} = require('./../models');

class ContaBancariaFuncionario {



    getById(req, res){
        
        let codF = req.params.id
        let newC = 'SELECT C.AGENCIA, C.BANCO, C.CONTA FROM CONTA_BANCARIA_FUNCIONARIO AS C INNER JOIN FUNCIONARIO AS F ON F.CODIGO_FUNCIONARIO = C.CODIGO_FUNCIONARIO WHERE F.CODIGO_FUNCIONARIO = "' + codF + '" '

        sequelize.query(newC)
           .then(result => {
               res.json(result[0])
               })
          }  
    


    create(req, res) {
        ContaBancariaFuncionarioModel.create(req.body)
            .then(conta => res.json(conta))
            .catch(error => res.json(error))
    }

    update(req, res) {
        ContaBancariaFuncionarioModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id
            }
        })
            .then(conta => res.json(conta))
            .catch(error => res.json(error))
    }
}
module.exports = new ContaBancariaFuncionario()