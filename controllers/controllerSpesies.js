'use strict';

const response = require('./res');
const connection = require('../service/koneksi');


//ordo
exports.getTbSpesies = function (req, res) {
    connection.query("SELECT * FROM tb_spesies where verifikasi='sukses' ORDER BY id_spesies ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbSpesiesv = function (req, res) {
    connection.query("SELECT * FROM tb_spesies where verifikasi='' ORDER BY id_spesies ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
// post spesies
exports.postTbSpesies    = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const habitat = req.body.habitat;
    const karakteristik = req.body.karakteristik;
    const keterangan = req.body.keterangan;
    const status = req.body.status;
    const image = req.body.image;
    const id_genus = req.body.id_genus;
    const id_kategori = req.body.id_kategori;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(req.file);
    await connection.query("INSERT INTO tb_spesies (id_spesies, nama_latin, nama_umum, habitat, karakteristik, keterangan, status, gambar, id_genus, id_kategori,latitude,longitude) VALUES (?,?,?,?,?,?,?,CONCAT(?),?,?,?,?)",[null,nama_latin, nama_umum, habitat,karakteristik,keterangan,status,image,id_genus,id_kategori,latitude,longitude], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
};

exports.deleteSpesies = function (req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM tb_spesies WHERE id_spesies=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbSpesiesID = function (req, res) {
    const id = req.params.id;
    connection.query("SELECT * FROM tb_spesies WHERE id_genus=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};



exports.putTbSpesies = async (req, res,next)=> {
    const id_spesies = req.body.id_spesies;
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const habitat = req.body.habitat;
    const karakteristik = req.body.karakteristik;
    const keterangan = req.body.keterangan;
    const status = req.body.status;
    const image = req.body.image;
    const id_genus = req.body.id_genus;
    const id_kategori = req.body.id_kategori;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(req.file);
    await connection.query("UPDATE tb_spesies SET nama_latin=?,nama_umum=?,habitat=?,karakteristik=?,keterangan=?,status=?,gambar=?,id_genus=?,id_kategori=?,latitude=?,longitude=? WHERE id_spesies =? ",[nama_latin, nama_umum, habitat,karakteristik,keterangan,status,image,id_genus,id_kategori,latitude,longitude,id_spesies], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}



exports.putTbSpesiesv = async (req, res,next)=> {
    const id_spesies = req.body.id_spesies;
   
    console.log(req.file);
    await connection.query("UPDATE tb_spesies SET verifikasi='sukses' WHERE id_spesies =? ",[id_spesies], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}

