const sequelize = require('./../../database/sequelize_remote');
const { ConvenioModel } = require('./../models');

class Convenio {

    get(req, res) {
        sequelize.query(`SELECT 
                            C.CODIGO, C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            T.DDD, T.NUMERO TELEFONE
                        FROM
                            CONVENIO C
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            WHERE STATUS = 1`,
        )
            .then(result => {
                res.json(result[0])
            })
    }

    getDesativados(req, res) {
        sequelize.query(`SELECT 
                            C.CODIGO, C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            T.DDD, T.NUMERO TELEFONE
                        FROM
                            CONVENIO C
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            WHERE STATUS = 0`,
        )
            .then(result => {
                res.json(result[0])
            })
    }

    getConvenioFull(req, res) {
        sequelize.query(`SELECT 
                            C.CODIGO AS COD_CONV, C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            T.CODIGO AS COD_TEL, T.DDD, T.NUMERO AS NUM_TEL,
                            E.CODIGO AS COD_END, E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA
                        FROM
                            CONVENIO C
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            LEFT JOIN ENDERECO_CONVENIO EC
                            ON EC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EC.ENDERECO_CODIGO
                            WHERE C.CODIGO = ${req.params.id}`).then(result => res.json(result[0]))
    }

    getById(req, res) {
        sequelize.query(`SELECT 
                            C.CODIGO, C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            T.DDD, T.NUMERO TELEFONE,
                            E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA
                        FROM
                            CONVENIO C
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            LEFT JOIN ENDERECO_CONVENIO EC
                            ON EC.CONVENIO_CODIGO = C.CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EC.ENDERECO_CODIGO
                            WHERE C.CODIGO = :CONVENIO_CODIGO`,
            { replacements: { CONVENIO_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    create(req, res) {
        ConvenioModel.create(req.body)
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    update(req, res) {
        ConvenioModel.update(req.body, {
            where: {
                CODIGO: req.params.id,
                STATUS: 1
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ConvenioModel.update({ STATUS: 0 }, {
            where: {
                CODIGO: req.params.id,
                STATUS: 1
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    ativar(req, res) {
        ConvenioModel.update({ STATUS: 1 }, {
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    getName(req, res) {
        sequelize.query(`SELECT NOME_CONVENIO FROM CONVENIO`)

            .then(result => {
                res.json(result[0])
            })
    }

    conveniosTratados(req, res) {
        sequelize.query(
            `SELECT 
            C.CODIGO,
            C.NOME_CONVENIO,
            C.TIPO_CONVENIO,
            GROUP_CONCAT(' ','(', T.DDD, ')',' ', T.NUMERO) AS TELEFONES
        FROM
            CONVENIO AS C
                JOIN
            TELEFONE_CONVENIO AS TC ON TC.CONVENIO_CODIGO = C.CODIGO
                JOIN
            TELEFONE AS T ON T.CODIGO = TC.TELEFONE_CODIGO
        WHERE
            C.STATUS = 1
        GROUP BY C.CODIGO;`
        ).then(result => {
            res.send(result[0])
        }).catch(error => {
            res.send(error)
        })
    }
}

module.exports = new Convenio()