const sequelize = require('./../database/sequelize_remote')
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../app/models/usuario')(sequelize, DataTypes)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const async = require('async')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const email = process.env.MAILER_EMAIL_ID || 'drvida.redefinicao@gmail.com'
const pass = process.env.MAILER_PASSWORD || 'drvida_redefinicao_2019'
const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
}

smtpTransport.use('compile', hbs(handlebarsOptions))

