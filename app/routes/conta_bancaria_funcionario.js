const express = require('express')
const route = express.Router()

const ContaBancariaFuncionarioController = require('./../controllers/conta_bancaria_funcionario')


route.get('/conta-bancaria-funcionario-query/:id', ContaBancariaFuncionarioController.getById)
route.post('/conta-bancaria-funcionario', ContaBancariaFuncionarioController.create)
route.put('/conta-bancaria-funcionario/:id',  ContaBancariaFuncionarioController.update)

module.exports = route