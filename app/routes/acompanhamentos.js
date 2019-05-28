const express = require('express')
const route = express.Router()

const AcompanhamentoController = require('./../controllers/acompanhamentos')
route.get('/acompanhamento', AcompanhamentoController.getAll)
route.get('/acompanhamento/:id', AcompanhamentoController.getById)
route.get('/acompanhamento-funcionario/:id', AcompanhamentoController.getFuncionarioByIdAc)
route.get('/acompanhamento-residente/:id', AcompanhamentoController.getResidenteByIdAc)
route.get('/acompanhamento-codigo', AcompanhamentoController.getCod)
route.post('/acompanhamento', AcompanhamentoController.create)
route.put('/acompanhamento-editar/:id', AcompanhamentoController.update)
route.delete('/acompanhamento/:id', AcompanhamentoController.delete)
route.get('/atividade/:codigo', AcompanhamentoController.getAcompanhamento)
route.post('/acompanhamento-data-inicial', AcompanhamentoController.dateStart)
route.post('/acompanhamento-data-inicial-final', AcompanhamentoController.dateStartAndDateFinish)

module.exports = route