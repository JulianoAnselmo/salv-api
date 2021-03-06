/**
 * author: NathanBarsoti8
 */

const sequelize = require('./../../database/sequelize_remote')
const OP = sequelize.Op

const { DependenteModel } = require('./../models')

class Dependente {

    getById(req, res) {
        DependenteModel.findAll({
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 1
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    getByName(req, res) {
        DependenteModel.findAll({
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                NOME: req.params.dependenteNome,
                SOBRENOME: req.params.dependenteSobrenome,
                STATUS: 1
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    create(req, res) {
        DependenteModel.create(req.body)
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    update(req, res) {
        DependenteModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                NOME: req.params.dependenteNome,
                SOBRENOME: req.params.dependenteSobrenome,
                STATUS: 1
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        DependenteModel.destroy({
            where: {
                NOME: req.params.dependenteNome,
                SOBRENOME: req.params.dependenteSobrenome,
                STATUS: 1
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    uniqueCPF(req, res) {
        DependenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                CPF: req.body.CPF,
                [OP.or]: {
                    CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO },
                    NOME: { [OP.ne]: req.body.NOME },
                    SOBRENOME: { [OP.ne]: req.body.SOBRENOME }
                }
            }
        })
            .then(dependente => {
                if (dependente)
                    res.json({ value: 0, message: 'CPF não é único!' })

                else
                    res.json({ value: 1, message: 'CPF é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueRG(req, res) {
        DependenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                RG: req.body.RG,
                [OP.or]: {
                    CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO },
                    NOME: { [OP.ne]: req.body.NOME },
                    SOBRENOME: { [OP.ne]: req.body.SOBRENOME }
                }
            }
        })
            .then(dependente => {
                if (dependente)
                    res.json({ value: 0, message: 'RG não é único!' })

                else
                    res.json({ value: 1, message: 'RG é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueNumeroCertidaoNascimento(req, res) {
        DependenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                NUMERO_CERTIDAO_NASCIMENTO: req.body.NUMERO_CERTIDAO_NASCIMENTO,
                [OP.or]: {
                    CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO },
                    NOME: { [OP.ne]: req.body.NOME },
                    SOBRENOME: { [OP.ne]: req.body.SOBRENOME }
                }
            }
        })
            .then(dependente => {
                if (dependente)
                    res.json({ value: 0, message: 'Número de Certidão de Nascimento não é único!' })

                else
                    res.json({ value: 1, message: 'Número de Certidão de Nascimento é único!' })
            })
            .catch(error => res.json(error))
    }

}

module.exports = new Dependente()