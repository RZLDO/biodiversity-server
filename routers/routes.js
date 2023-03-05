'use strict';
const multer = require('multer');
const path = require('path');
const express = require('express');
const storage = multer.diskStorage({
    destination:'assets/',
    filename:(req,file,cb)=>{
      return  cb(null,`${path.basename(file.originalname)}`)
    }
});

const upload = multer({
    storage:storage,
    fileFilter:function (req,file,cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = "Only image files are allowed";
            return cb(new Error('only image file are allowed',false));
            
        }
        cb(null,true);
    }
}).single("image")

module.exports = function(app){
    var controller = require('../controllers/controller');
    var controllerordo = require('../controllers/controllerordo');
    var controllerfamili = require('../controllers/controllerfamili');
    var controllergenus = require('../controllers/controllerGenus');
    var controllerspesies = require('../controllers/controllerSpesies');
    var controllerkelangkaan = require('../controllers/controllerKelangkaan');
    app.route('/').get(controller.index);
    //kelangkaan route
    app.route('/kelangkaan').get(controllerkelangkaan.getTbKelangkaan);
    
    //spesies route
    app.use('/spesies',express.static('assets'));
    app.route('/spesies').get(controllerspesies.getTbSpesies);
    app.route('/spesiesv').get(controllerspesies.getTbSpesiesv);
    app.route('/spesies/:id').get(controllerspesies.getTbSpesiesID);
    app.post('/spesies', controllerspesies.postTbSpesies);
    app.delete('/spesies/:id', controllerspesies.deleteSpesies);
    app.put('/spesies', controllerspesies.putTbSpesies);
    app.put('/spesiesv', controllerspesies.putTbSpesiesv);
    //genus route
    app.use('/genus',express.static('assets'));
    app.route('/genus').get(controllergenus.getTbGenus);
    app.route('/genusv').get(controllergenus.getTbGenusv);
    app.route('/genus/:id').get(controllergenus.getTbGenusID);
    app.post('/genus', controllergenus.postTbGenus);
    app.delete('/genus/:id', controllergenus.deleteGenus);
    app.put('/genus', controllergenus.putTbGenus);
    app.put('/genusv', controllergenus.putTbGenusv);
    //famili route
    app.use('/famili',express.static('assets'));
    app.route('/famili').get(controllerfamili.getTbFamili);
    app.route('/familiv').get(controllerfamili.getTbFamiliv);
    app.route('/famili/:id').get(controllerfamili.getTbFamiliId);
    app.post('/famili', controllerfamili.postTbFamili);
    app.delete('/famili/:id', controllerfamili.deleteFamili);
    app.put('/famili', controllerfamili.putTbFamili);
    app.put('/familiv', controllerfamili.putTbFamiliv);
    //ordo route
    app.use('/ordo',express.static('assets'));
    app.route('/ordo').get(controllerordo.getTbOrdo);
    app.route('/ordov').get(controllerordo.getTbOrdov);
    app.route('/ordo/:id').get(controllerordo.getTbOrdoId);
    app.post('/ordo', controllerordo.postTbOrdo);
    app.delete('/ordo/:id', controllerordo.deleteOrdo);
    app.put('/ordo', controllerordo.putTbOrdo);
    app.put('/ordov', controllerordo.putTbOrdov);
    //class route
    app.use('/class',express.static('assets'));

    app.route('/class').get(controller.getTbClass);
    app.route('/classv').get(controller.getTbClassV);
    app.route('/institusi/:id').get(controller.getTbInstansi);
    app.route('/institusi').get(controller.getTbInstansiAll);
    app.route('/kategori').get(controller.getTbkategori);
    app.post('/class', controller.postTbClas);
    app.post('/instansi', controller.postTbInstansi);
    app.put('/class', controller.putTbClas);
    app.put('/classv', controller.putTbClasV);
    app.delete('/class/:id', controller.deletebClass);
    app.post('/upload', upload);
}