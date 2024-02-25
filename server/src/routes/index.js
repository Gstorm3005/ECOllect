const express = require("express")



const auth = require("./auth")
const admin = require('./admin')
const chargement = require('./chargement')
const demande = require('./demande')
const histocollector = require('./histocollector')
const histopdd = require('./histopdd')
const histotransporter = require('./histotransporter')
const pdd = require('./pdd')
const role = require('./role')
const stockcollector = require('./stockcollector')
const user = require('./user')
const usine = require('./usine')
const wilaya = require('./wilaya')

const router = express.Router()



// Apply the auth middleware to all routes except login
router.use('/auth', auth)
router.use('/admin', admin)
router.use('/chargement', chargement)
router.use('/demande', demande)
router.use('/histocollector', histocollector)
router.use('/histopdd', histopdd)
router.use('/histotransporter', histotransporter)
router.use('/pdd', pdd)
router.use('/role', role)
router.use('/stockcollector', stockcollector)
router.use('/user', user)
router.use('/usine', usine)
router.use('/wilaya', wilaya)



module.exports = router